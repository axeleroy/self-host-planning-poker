import { Component, Input } from '@angular/core';
import { PlayerState } from '../../../model/events';
import { Deck, displayCardValue } from '../../../model/deck';
import { NgIf } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
    selector: 'shpp-player-hand',
    templateUrl: './player-hand.component.html',
    styleUrls: ['./player-hand.component.scss'],
    standalone: true,
    imports: [TranslocoDirective, NgIf]
})
export class PlayerHandComponent {
  @Input() playerState?: PlayerState;
  @Input() deck?: Deck;

  displayCardValue = displayCardValue;
}
