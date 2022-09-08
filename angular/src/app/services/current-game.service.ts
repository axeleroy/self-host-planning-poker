import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { UserInformationService } from './user-information.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMessage, GameHands, GameInfo, GameState } from '../model/events';
import { Deck } from '../model/deck';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService implements CanActivate {

  private socket: Socket;

  private stateSubject = new BehaviorSubject<GameState | null>(null);
  private handsSubject = new BehaviorSubject<GameHands | null>(null);
  private infoSubject = new BehaviorSubject<GameInfo | null>(null);
  private errorSubject = new BehaviorSubject<ErrorMessage | null>(null);

  constructor(private router: Router,
              private userInformation: UserInformationService) {
    this.socket = io(environment.urlRoot);

    this.socket.on('state', (state: GameState) => this.stateSubject.next(state));
    this.socket.on('info', (info: GameInfo) => this.infoSubject.next(info));
    this.socket.on('hands', (hands: GameHands) => this.handsSubject.next(hands));

    this.socket.on('disconnect', () => {
      this.stateSubject.next(null);
      this.infoSubject.next(null);
      this.handsSubject.next(null);
    })

    this.userInformation.nameObservable().subscribe((name: string) => {
      if (this.socket.connected) {
        this.socket.emit('set_player_name', {name: name});
      }
    });
    this.userInformation.spectatorObservable().subscribe((spectator: boolean) => {
      if (this.socket.connected) {
        this.socket.emit('set_spectator', {spectator: spectator})
      }
    })
  }

  public get state$(): Observable<GameState | null> {
    return this.stateSubject.asObservable();
  }

  public get hands$(): Observable<GameHands | null> {
    return this.handsSubject.asObservable();
  }

  public get gameInfo$(): Observable<GameInfo | null> {
    return this.infoSubject.asObservable();
  }

  public get errors$(): Observable<ErrorMessage | null> {
    return this.errorSubject.asObservable();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const gameId = route.params['gameId'];
    this.socket.connect();
    return new Promise((resolve) => {
      this.socket.emit('join', {
        game: gameId,
        name: this.userInformation.getName(),
        spectator: this.userInformation.isSpectator()
      }, (response: GameInfo | ErrorMessage) => {
        if ('error' in response) {
          this.handleError(response);
          this.socket.disconnect();
          resolve(this.router.parseUrl('/'));
        } else {
          this.infoSubject.next(response);
          this.userInformation.setPlayerIdSubject(response.playerId);
          resolve(true);
        }
      });
    });

  }

  public leave(): void {
    this.socket.disconnect();
  }

  public renameGame(newName: string): void {
    this.socket.emit('rename_game', { name: newName });
  }

  public setDeck(deck: Deck): void {
    this.socket.emit('set_deck', {deck: deck.name});
  }

  public pickCard(cardValue: number | null): void {
    this.socket.emit('pick_card', { card: cardValue });
  }

  public revealCard(): void {
    this.socket.emit('reveal_card');
  }

  public endTurn(): void {
    this.socket.emit('end_turn');
  }

  private handleError(error: ErrorMessage) {
    this.errorSubject.next(error);
  }

}
