import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'shpp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  imports: [TranslocoModule],
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

}
