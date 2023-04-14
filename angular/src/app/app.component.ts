import { Component } from '@angular/core';
import { getBrowserCultureLang, getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { TranslocoLocaleService } from '@ngneat/transloco-locale';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'shpp-root',
    templateUrl: './app.component.html',
    styles: [],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {

  constructor(private transloco: TranslocoService,
              private translocoLocale: TranslocoLocaleService) {
    transloco.setActiveLang(getBrowserLang() || 'en');
    translocoLocale.setLocale(getBrowserCultureLang())
  }
}
