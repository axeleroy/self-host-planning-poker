import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  imports: [
    TranslocoLocaleModule.forRoot({
      langToLocaleMapping: {
        en: 'en-US',
        fr: 'fr-FR'
      }
    })
  ],
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'fr'],
        fallbackLang: 'en',
        prodMode: environment.production,
        missingHandler: {
          useFallbackTranslation: true
        }
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    provideHttpClient()
  ]
})
export class TranslocoRootModule {}
