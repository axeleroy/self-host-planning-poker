import { Component } from '@angular/core';
import { getBrowserCultureLang, getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { TranslocoLocaleService } from '@ngneat/transloco-locale';

@Component({
  selector: 'shpp-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(private transloco: TranslocoService,
              private translocoLocale: TranslocoLocaleService) {
    transloco.setActiveLang(getBrowserLang() || 'en');
    translocoLocale.setLocale(getBrowserCultureLang())
  }
}
