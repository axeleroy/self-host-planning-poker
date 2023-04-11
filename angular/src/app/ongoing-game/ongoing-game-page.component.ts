import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription, switchMap } from 'rxjs';
import { CurrentGameService } from './current-game.service';

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
    .pipe(
      switchMap((gameInfo) => this.transloco.selectTranslate('ongoingGame.page-title', { gameName: gameInfo?.name })))
    .subscribe((translatedPageTitle) => this.titleService.setTitle(translatedPageTitle));
    this.revealedSubscription = this.currentGameService.revealed$.subscribe((revealed) => this.showSummary = revealed);
  }

  ngOnDestroy(): void {
    this.gameInfoSubscription.unsubscribe();
    this.revealedSubscription.unsubscribe();
    this.currentGameService.leave();
  }

}
