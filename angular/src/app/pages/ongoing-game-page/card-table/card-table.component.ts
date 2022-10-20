import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { GameState } from '../../../model/events';
import { Subscription } from 'rxjs';
import { Deck } from '../../../model/deck';

@Component({
  selector: 'shpp-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: [ './card-table.component.scss' ]
})
export class CardTableComponent implements OnDestroy {
  state: GameState = {}
  canReveal = true;
  deck?: Deck;

  private stateSubscription: Subscription;
  private revealedSubscription: Subscription;
  private deckSubscription: Subscription;

  constructor(private currentGameService: CurrentGameService) {
    this.stateSubscription = this.currentGameService.state$
    .subscribe((state: GameState) => {
      this.state = state;
    });

    this.deckSubscription = currentGameService.deck$
    .subscribe((deck: Deck) => this.deck = deck);

    this.revealedSubscription = currentGameService.revealed$
    .subscribe((revealed: boolean) => this.canReveal = !revealed)
  }

  revealCards(): void {
    this.currentGameService.revealCards();
  }

  endTurn(): void {
    this.currentGameService.endTurn();
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
    this.revealedSubscription.unsubscribe();
    this.deckSubscription.unsubscribe();
  }

}
