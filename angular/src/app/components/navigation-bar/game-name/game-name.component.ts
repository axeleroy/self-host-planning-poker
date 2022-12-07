import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { GameInfo } from '../../../model/events';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'shpp-game-name',
  templateUrl: './game-name.component.html',
  styles: [
  ]
})
export class GameNameComponent implements OnDestroy {

  currentGameInfo: GameInfo | null | undefined;
  private gameInfoSubscription: Subscription;

  constructor(private currentGameService: CurrentGameService,
              private toastService:  ToastService,
              private clipboard: Clipboard,
              private transloco: TranslocoService) {
    this.gameInfoSubscription = this.currentGameService.gameInfo$
    .subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  ngOnDestroy(): void {
    this.gameInfoSubscription.unsubscribe();
  }

  copyLink(): void {
    this.clipboard.copy(window.location.toString());
    this.toastService.show(
      this.transloco.translate('navbar.gameName.copy-toast')
    )
  }

}
