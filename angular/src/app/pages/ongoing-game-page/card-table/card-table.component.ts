import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { PlayerHand } from '../../../model/events';
import { combineLatest, Subscription } from 'rxjs';
import { Deck } from '../../../model/deck';

@Component({
  selector: 'shpp-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: [ './card-table.component.scss' ]
})
export class CardTableComponent implements OnDestroy {
  state: TableState = {}
  canReveal = true;
  deck?: Deck;

  private stateSubscription?: Subscription;
  private handsSubscription?: Subscription;
  private endTurnSubscription?: Subscription;
  private deckSubscription?: Subscription;

  constructor(private currentGameService: CurrentGameService) {
    this.stateSubscription = combineLatest([this.currentGameService.state$, this.currentGameService.hands$])
    .subscribe(([state, hands]) => {
      this.state = state;
      this.canReveal = hands === null || Object.keys(hands).length === 0;
      for (let key in this.state) {
        if (!hands) {
          this.state[key].hand = undefined;
        } else {
          this.state[key].hand = hands[key];
        }
      }
    });

    this.deckSubscription = currentGameService.deck$
    .subscribe((deck) => this.deck = deck);
  }

  revealCards(): void {
    this.currentGameService.revealCards();
  }

  endTurn(): void {
    this.currentGameService.endTurn();
  }

  ngOnDestroy(): void {
    this.stateSubscription?.unsubscribe();
    this.handsSubscription?.unsubscribe();
    this.endTurnSubscription?.unsubscribe();
  }

}

type TableState = Record<string, PlayerHand>;
