import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../services/current-game.service';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shpp-ongoing-game-page',
  templateUrl: './ongoing-game-page.component.html',
  styleUrls: [ './ongoing-game-page.component.scss' ]
})
export class OngoingGamePageComponent implements OnDestroy {
  private gameInfoSubscription: Subscription;
  private revealedSubscription: Subscription;

  showSummary = false;

  constructor(private currentGameService: CurrentGameService,
              private titleService: Title,
              private transloco: TranslocoService) {
    this.gameInfoSubscription = this.currentGameService.gameInfo$
    .subscribe((gameInfo) =>
      this.titleService.setTitle(this.transloco.translate('ongoingGame.page-title', { gameName: gameInfo?.name })))
    this.revealedSubscription = this.currentGameService.revealed$.subscribe((revealed) => this.showSummary = revealed);
  }

  ngOnDestroy(): void {
    this.gameInfoSubscription.unsubscribe();
    this.revealedSubscription.unsubscribe();
    this.currentGameService.leave();
  }

}
