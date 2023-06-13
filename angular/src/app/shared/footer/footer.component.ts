import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'shpp-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [ TranslocoModule ]
})
export class FooterComponent {

}
