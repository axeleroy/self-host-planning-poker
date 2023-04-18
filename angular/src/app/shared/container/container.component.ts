import { Component } from '@angular/core';
import { ToastsContainerComponent } from '../toast/toast-container.component';
import { NavigationBarComponent } from '../../navigation-bar/navigation-bar.component';

@Component({
  standalone: true,
  selector: 'shpp-container',
  templateUrl: './container.component.html',
  imports: [ NavigationBarComponent, ToastsContainerComponent ]
})
export class ContainerComponent {

}
