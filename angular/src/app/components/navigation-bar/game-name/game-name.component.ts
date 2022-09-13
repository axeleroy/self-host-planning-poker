import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { GameInfo } from '../../../model/events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shpp-game-name',
  templateUrl: './game-name.component.html',
  styles: [
  ]
})
export class GameNameComponent implements OnDestroy {

  currentGameInfo?: GameInfo | null;
  private gameInfoSubscription?: Subscription;

  constructor(private currentGameService: CurrentGameService) {
    this.gameInfoSubscription = this.currentGameService.gameInfo$
    .subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  ngOnDestroy(): void {
    this.gameInfoSubscription?.unsubscribe();
  }

}
