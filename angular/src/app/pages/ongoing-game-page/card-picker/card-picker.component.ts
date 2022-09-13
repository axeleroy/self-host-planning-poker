import { Component } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { CardValue, Deck, decksDict } from '../../../model/deck';
import { filter } from 'rxjs';
import { GameInfo } from '../../../model/events';

@Component({
  selector: 'shpp-card-picker',
  templateUrl: './card-picker.component.html',
  styleUrls: [ './card-picker.component.scss' ]
})
export class CardPickerComponent {
  deck?: Deck
  selectedCard?: CardValue;

  constructor(private currentGame: CurrentGameService) {
    this.currentGame.gameInfo$
    .pipe(
      filter((gameInfo: GameInfo | null):  gameInfo is GameInfo => gameInfo !== null))
    .subscribe((gameInfo) => this.deck = decksDict[gameInfo.deck]);
  }

  selectCard(card: CardValue) {
    if (this.selectedCard !== card) {
      this.selectedCard = card;
      this.currentGame.pickCard(card.value);
    } else {
      this.selectedCard = undefined;
      this.currentGame.pickCard(null);
    }
  }
}
