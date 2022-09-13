import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { PlayerHand, PlayerState } from '../../../model/events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shpp-card-table',
  templateUrl: './card-table.component.html',
  styles: [
  ]
})
export class CardTableComponent implements OnDestroy {
  state: TableState = {}

  private stateSubscription?: Subscription;
  private handsSubscription?: Subscription;
  private endTurnSubscription?: Subscription;

  constructor(private currentGameService: CurrentGameService) {
    this.stateSubscription = this.currentGameService.state$
      .subscribe((state) => this.state = state);
    this.handsSubscription = this.currentGameService.hands$.subscribe((hands) => {
      for (let key in this.state) {
        if (!hands) {
          this.state[key].hand = undefined;
        } else {
          this.state[key].hand = hands[key];
        }
      }
    })
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

type TableState = Record<string, PlayerState & PlayerHand>;
