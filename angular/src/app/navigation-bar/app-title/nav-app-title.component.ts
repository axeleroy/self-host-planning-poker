import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'shpp-nav-app-title',
  templateUrl: './nav-app-title.component.html',
  standalone: true,
  imports: [ TranslocoDirective ]
})
export class NavAppTitleComponent {

}
