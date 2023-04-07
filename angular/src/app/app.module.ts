import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco-root.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslocoRootModule,
    TranslocoLocaleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
