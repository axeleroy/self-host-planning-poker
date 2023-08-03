import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'shpp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  imports: [TranslocoDirective],
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

}
