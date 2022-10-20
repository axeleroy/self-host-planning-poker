import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { CardValue, Deck, decksDict } from '../../../model/deck';
import { filter, Subscription } from 'rxjs';
import { GameInfo } from '../../../model/events';
import { UserInformationService } from '../../../services/user-information.service';

@Component({
  selector: 'shpp-card-picker',
  templateUrl: './card-picker.component.html',
  styleUrls: [ './card-picker.component.scss' ]
})
export class CardPickerComponent implements OnDestroy {
  deck?: Deck
  selectedCard?: CardValue;
  isSpectator = false;
  isGameRevealed = false;

  private deckSubscription: Subscription;
  private newGameSubscription: Subscription;
  private spectatorSubscription: Subscription;
  private gameRevealedSubscription: Subscription;

  constructor(private currentGame: CurrentGameService,
              private userInfoService: UserInformationService) {
    this.deckSubscription = currentGame.deck$
    .subscribe((deck) => {
      this.deck = deck;
      this.selectedCard = undefined;
    });

    this.newGameSubscription = this.currentGame.newGame$
    .subscribe(() => this.selectedCard = undefined);

    this.spectatorSubscription = this.userInfoService.spectatorObservable()
    .subscribe((spectator: boolean) => {
      this.isSpectator = spectator;
      if (spectator) {
        this.selectedCard = undefined;
      }
    });

    this.gameRevealedSubscription = this.currentGame.revealed$
    .subscribe((revealed: boolean) => this.isGameRevealed = revealed);
  }

  selectCard(card: CardValue): void {
    if (this.isSpectator || this.isGameRevealed) {
      return;
    }
    if (this.selectedCard !== card) {
      this.selectedCard = card;
      this.currentGame.pickCard(card.value);
    } else {
      this.selectedCard = undefined;
      this.currentGame.pickCard(null);
    }
  }

  ngOnDestroy(): void {
    this.deckSubscription.unsubscribe();
    this.newGameSubscription.unsubscribe();
    this.spectatorSubscription.unsubscribe();
  }

}
