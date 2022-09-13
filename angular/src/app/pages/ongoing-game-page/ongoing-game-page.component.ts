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
  private subscription?: Subscription;

  constructor(public currentGameService: CurrentGameService,
              private titleService: Title,
              private transloco: TranslocoService) {
    this.currentGameService.gameInfo$.subscribe((gameInfo) =>
      this.titleService.setTitle(this.transloco.translate('ongoingGame.page-title', { gameName: gameInfo?.name })))
  }

  revealCards(): void {
    this.currentGameService.revealCards();
  }

  endTurn(): void {
    this.currentGameService.endTurn();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.currentGameService.leave();
  }

}
