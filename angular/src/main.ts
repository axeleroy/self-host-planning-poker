import { enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoRootModule } from './app/transloco-root.module';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, AppRoutingModule, TranslocoRootModule, TranslocoLocaleModule)]
})
  .catch(err => console.error(err));
