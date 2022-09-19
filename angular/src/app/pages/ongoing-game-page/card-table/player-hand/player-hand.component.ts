import { Component, Input } from '@angular/core';
import { PlayerHand } from '../../../../model/events';
import { Deck, displayCardValue } from '../../../../model/deck';

@Component({
  selector: 'shpp-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: [ './player-hand.component.scss' ]
})
export class PlayerHandComponent {
  @Input() playerHand?: PlayerHand;
  @Input() deck?: Deck;

  displayCardValue = displayCardValue;
}
