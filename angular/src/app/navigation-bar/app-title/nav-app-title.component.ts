import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'shpp-nav-app-title',
  templateUrl: './nav-app-title.component.html',
  standalone: true,
  imports: [ TranslocoModule ]
})
export class NavAppTitleComponent {

}
