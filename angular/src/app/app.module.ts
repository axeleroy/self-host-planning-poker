import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewGamePageComponent } from './pages/new-game-page/new-game-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OngoingGamePageComponent } from './pages/ongoing-game-page/ongoing-game-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFormComponent,
    NewGamePageComponent,
    OngoingGamePageComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
