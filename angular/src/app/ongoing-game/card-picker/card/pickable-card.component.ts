import { Component, Input } from '@angular/core';
import { CardValue } from '../../../model/deck';

@Component({
  selector: 'shpp-pickable-card',
  templateUrl: './pickable-card.component.html',
  styleUrls: [ './pickable-card.component.scss' ]
})
export class PickableCardComponent {
  @Input() cardValue?: CardValue;
  @Input() selected = false;
  @Input() disabled = false;

}
