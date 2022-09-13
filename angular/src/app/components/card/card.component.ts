import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardValue } from '../../model/deck';

@Component({
  selector: 'shpp-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ]
})
export class CardComponent {
  @Input() cardValue?: CardValue;
  @Input() clickable = false;
  @Input() selected = false;

}
