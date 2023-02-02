import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { PlayerState } from '../../../model/events';
import { combineLatest, filter, map, Subscription, tap } from 'rxjs';
import { Deck, decksDict, displayCardValue } from '../../../model/deck';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'shpp-turn-summary',
  templateUrl: './turn-summary.component.html',
  styleUrls: [ './turn-summary.component.scss' ]
})
export class TurnSummaryComponent implements OnDestroy {
  private subscription: Subscription;

  displayCardValue = displayCardValue;
  Number = Number;
  round = Math.round;
  valueDescOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number =>
    a.value > b.value ? -1 : (b.value > a.value ? 1 : 0)

  deck: Deck = decksDict['FIBONACCI'];
  average = 0;
  counts: CardCount = {};
  agreement = 0;

  constructor(private currentGameService: CurrentGameService) {
    this.subscription = combineLatest([this.currentGameService.state$, this.currentGameService.gameInfo$])
    .pipe(
      filter(([, gameInfo]) => gameInfo !== null && gameInfo.revealed),
      tap(([, gameInfo]) => {
        if (gameInfo) {
          this.deck = decksDict[gameInfo.deck];
        }
      }),
      map(([gameState]) => Object.values(gameState))
    ).subscribe((playerStates: PlayerState[]) => {
      const players = playerStates.filter((state) => state.hand !== undefined && state.hand !== null);
      this.average = players.reduce((prev, current) => prev + (current.hand || 0) , 0) / players.length || 0;
      this.counts = players.map((player) => player.hand || 0)
        .reduce((previous, current) => {
          let num = previous[current.toString()] || 0;
          previous[current.toString()] = num + 1;
          return previous;
        }, {} as CardCount);
      this.agreement = Math.max(0, ...Object.values(this.counts)) / players.length || 0;
    });
  }

  agreementClass(): string {
    if (this.agreement === 0) {
      return '';
    } else if (this.agreement < .5) {
      return 'text-danger';
    } else if (this.agreement < .7) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

type CardCount = Record<string, number>;
