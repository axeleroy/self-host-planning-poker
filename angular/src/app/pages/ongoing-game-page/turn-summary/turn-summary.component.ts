import { Component } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { PlayerState } from '../../../model/events';
import { combineLatest, filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'shpp-turn-summary',
  templateUrl: './turn-summary.component.html',
  styleUrls: [ './turn-summary.component.scss' ]
})
export class TurnSummaryComponent {
  private subscription: Subscription;

  average = 0;
  counts: CardCount = {};
  constructor(private currentGameService: CurrentGameService) {
    this.subscription = combineLatest([this.currentGameService.state$, this.currentGameService.gameInfo$])
    .pipe(
      filter(([gameState, gameInfo]) => gameInfo !== null && gameInfo.revealed),
      map(([gameState, gameInfo]) => Object.values(gameState))
    ).subscribe((playerStates: PlayerState[]) => {
      let players = playerStates.filter((state) => state.hand !== undefined && state.hand !== null);
      this.average = players.reduce((prev, current) => prev + (current.hand || 0) , 0) / players.length;
      this.counts = players.map((player) => player.hand || 0)
        .reduce((previous, current) => {
          let num = previous[current.toString()] || 0;
          previous[current.toString()] = num + 1;
          return previous;
        }, {} as CardCount)
    });
  }

}

type CardCount = Record<string, number>;
