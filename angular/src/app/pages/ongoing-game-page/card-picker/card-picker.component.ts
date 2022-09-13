import { Component } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { CardValue, Deck, decksDict } from '../../../model/deck';
import { filter } from 'rxjs';
import { GameInfo } from '../../../model/events';
import { UserInformationService } from '../../../services/user-information.service';

@Component({
  selector: 'shpp-card-picker',
  templateUrl: './card-picker.component.html',
  styleUrls: [ './card-picker.component.scss' ]
})
export class CardPickerComponent {
  deck?: Deck
  selectedCard?: CardValue;
  isSpectator = false;

  constructor(private currentGame: CurrentGameService,
              private userInfoService: UserInformationService) {
    this.currentGame.gameInfo$
    .pipe(
      filter((gameInfo: GameInfo | null):  gameInfo is GameInfo => gameInfo !== null))
    .subscribe((gameInfo) => this.deck = decksDict[gameInfo.deck]);

    this.userInfoService.spectatorObservable().subscribe((spectator) => {
      this.isSpectator = spectator;
      if (spectator) {
        this.selectedCard = undefined;
      }
    })
  }

  selectCard(card: CardValue): void {
    if (this.isSpectator) {
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
}
