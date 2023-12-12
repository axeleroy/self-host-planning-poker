import { inject, Injectable } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';
import { ErrorMessage, GameInfo, GameState } from '../model/events';
import { Deck, decksDict } from '../model/deck';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HashMap, TranslocoService } from '@ngneat/transloco';
import { UserInformationService } from '../shared/user-info/user-information.service';
import { ToastService } from '../shared/toast/toast.service';
import { PathLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {
  private readonly totalAttempts = 10;
  private readonly reconnectDelaySeconds = 5;
  private readonly retries = 5;
  private readonly ackTimeoutMs = 10000;

  private manager: Manager;
  private socket: Socket;

  private stateSubject = new BehaviorSubject<GameState>({});
  private infoSubject = new BehaviorSubject<GameInfo | null>(null);
  private newGameSubject = new Subject<void>();

  constructor(private router: Router,
              private userInformation: UserInformationService,
              private transloco: TranslocoService,
              private toastService: ToastService,
              private pls: PathLocationStrategy) {
    this.manager = new Manager(environment.backendRootOverride ?? window.location.origin,
      {
        path: `${this.pls.getBaseHref()}socket.io/`,
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: this.reconnectDelaySeconds * 1000,
        reconnectionAttempts: this.totalAttempts
      });
    this.socket = this.manager.socket('/', {
      retries: this.retries,
      ackTimeout: this.ackTimeoutMs
    });

    this.socket.on('state', (state: GameState) => this.stateSubject.next(state));
    this.socket.on('info', (info: GameInfo) => this.infoSubject.next(info));
    this.socket.on('new_game', () => this.newGameSubject.next());

    this.socket.on('disconnect', (reason) => {
      if (reason !== 'io client disconnect') {
        this.error('errors.disconnect', {reason: reason, delay: this.reconnectDelaySeconds});
      }
      console.info(`Socket disconnected. Reason is "${reason}"`);
    });
    this.manager.on('reconnect_attempt', (attempt: number) => {
      this.info('reconnect.attempt', { attempt: attempt, total: this.totalAttempts });
    });
    this.manager.on('reconnect_error', (err: Error) => {
      this.error('reconnect.error', { error: err.message });
    });
    this.manager.on('reconnect_failed', () => {
      this.error('reconnect.failed', { attempts: this.totalAttempts });
    });
    this.manager.on('reconnect', (attempt: number) => {
      this.success('reconnect.success', { attempts: attempt });
    });

    this.userInformation.nameObservable().subscribe((name: string) => {
      if (this.socket.connected) {
        this.socket.emit('set_player_name', {name: name});
      }
    });
    this.userInformation.spectatorObservable().subscribe((spectator: boolean) => {
      if (this.socket.connected) {
        this.socket.emit('set_spectator', {spectator: spectator})
      }
    });
  }

  public get state$(): Observable<GameState> {
    return this.stateSubject.asObservable();
  }

  public get gameInfo$(): Observable<GameInfo | null> {
    return this.infoSubject.asObservable();
  }

  public get newGame$(): Observable<void>{
    return this.newGameSubject.asObservable();
  }

  public get revealed$(): Observable<boolean> {
    return this.gameInfo$.pipe(
      map((info: GameInfo | null) => info !== null ? info.revealed : false)
    );
  }

  public get deck$(): Observable<Deck> {
    return this.infoSubject.asObservable()
    .pipe(
      filter((gameInfo: GameInfo | null): gameInfo is GameInfo => gameInfo !== null),
      map((gameInfo: GameInfo) => decksDict[gameInfo?.deck])
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const gameId = route.params['gameId'];
    return this.socket.connect()
    .emitWithAck('join', {
      game: gameId,
      name: this.userInformation.getName(),
      spectator: this.userInformation.isSpectator()
    })
    .then((response: GameInfo | ErrorMessage) => {
        if ('error' in response) {
          this.socket.disconnect();
          this.handleError(response);
          return this.router.parseUrl('/');
        } else {
          this.infoSubject.next(response);
          this.userInformation.setPlayerIdSubject(response.playerId);
          return true;
        }
      },
      (reason: any) => {
        this.handleError(reason);
        return this.router.parseUrl('/');
      });
  }

  public leave(): void {
    this.socket.disconnect();
    this.stateSubject.next({});
    this.infoSubject.next(null);
  }

  public renameGame(newName: string): void {
    this.socket.emit('rename_game', { name: newName }, (response?: ErrorMessage) => this.handleError(response));
  }

  public setDeck(deck: Deck): void {
    this.socket.emit('set_deck', { deck: deck.name }, (response?: ErrorMessage) => this.handleError(response));
  }

  public pickCard(cardValue: number | null): void {
    this.socket.emit('pick_card', { card: cardValue }, (response?: ErrorMessage) => this.handleError(response));
  }

  public revealCards(): void {
    this.socket.emit('reveal_cards', (response?: ErrorMessage) => this.handleError(response));
  }

  public endTurn(): void {
    this.socket.emit('end_turn', (response?: ErrorMessage) => this.handleError(response));
  }

  private handleError(error?: ErrorMessage | any): void {
    if (!!error) {
      if ('error' in error) {
        this.error(`errors.${error.code}`, { message: error.message });
      } else {
        this.error(`errors.0`, { message: error });
      }
    }
  }

  private info(key: string, translateParams?: HashMap): void {
    this.transloco.selectTranslate(key, translateParams).subscribe((text) => {
      console.info(text);
      this.toastService.show(text, { className: 'bg-info' });
    })
  }

  private success(key: string, translateParams?: HashMap): void {
    this.transloco.selectTranslate(key, translateParams).subscribe((text) => {
      console.info(text);
      this.toastService.show(text, { className: 'bg-success text-light' });
    });
  }

  private error(key: string, translateParams?: HashMap): void {
    this.transloco.selectTranslate(key, translateParams).subscribe((text) => {
      console.error(text);
      this.toastService.show(text, { className: 'bg-danger text-light' });
    })
  }

}

export const canActivateGame: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CurrentGameService).canActivate(route);
}
