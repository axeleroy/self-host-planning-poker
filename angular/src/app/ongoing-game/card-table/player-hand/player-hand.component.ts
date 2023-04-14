import { Component, Input } from '@angular/core';
import { PlayerState } from '../../../model/events';
import { Deck, displayCardValue } from '../../../model/deck';
import { NgIf } from '@angular/common';
import { TranslocoRootModule } from '../../../transloco-root.module';

@Component({
    selector: 'shpp-player-hand',
    templateUrl: './player-hand.component.html',
    styleUrls: ['./player-hand.component.scss'],
    standalone: true,
    imports: [NgIf, TranslocoRootModule]
})
export class PlayerHandComponent {
  @Input() playerState?: PlayerState;
  @Input() deck?: Deck;

  displayCardValue = displayCardValue;
  isNan(input: any) {
    return Number.isNaN(Number(input));
  }
}
