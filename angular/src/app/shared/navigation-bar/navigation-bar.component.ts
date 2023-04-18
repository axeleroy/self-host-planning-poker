import { Component } from '@angular/core';
import { TranslocoRootModule } from '../../transloco-root.module';

@Component({
  standalone: true,
  selector: 'shpp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  imports: [
    TranslocoRootModule
  ],
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

}
