import { Component, Input } from '@angular/core';
import { PlayerState } from '../../../model/events';
import { Deck, displayCardValue } from '../../../model/deck';

@Component({
  selector: 'shpp-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: [ './player-hand.component.scss' ]
})
export class PlayerHandComponent {
  @Input() playerState?: PlayerState;
  @Input() deck?: Deck;

  displayCardValue = displayCardValue;
  isNan(input: any) {
    return Number.isNaN(Number(input));
  }
}
