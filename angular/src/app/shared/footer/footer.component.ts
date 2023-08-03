import { Component } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'shpp-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [ TranslocoDirective ]
})
export class FooterComponent {

}
