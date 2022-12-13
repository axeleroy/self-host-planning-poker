import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameFormComponent } from './components/forms/game-form/game-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewGamePageComponent } from './pages/new-game-page/new-game-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OngoingGamePageComponent } from './pages/ongoing-game-page/ongoing-game-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameNameComponent } from './components/navigation-bar/game-name/game-name.component';
import { PlayerInfoComponent } from './components/navigation-bar/player-info/player-info.component';
import { GameInfoComponent } from './components/navigation-bar/game-info/game-info.component';
import { TranslocoRootModule } from './transloco-root.module';
import { CardPickerComponent } from './pages/ongoing-game-page/card-picker/card-picker.component';
import { PickableCardComponent } from './pages/ongoing-game-page/card-picker/card/pickable-card.component';
import { CardTableComponent } from './pages/ongoing-game-page/card-table/card-table.component';
import { PlayerHandComponent } from './pages/ongoing-game-page/card-table/player-hand/player-hand.component';
import { ToastsContainer } from './services/toast/toast-container.component';
import { SetUsernamePageComponent } from './pages/set-username-page/set-username-page.component';
import { PlayerNameFormComponent } from './components/forms/player-name-form/player-name-form.component';
import { TurnSummaryComponent } from './pages/ongoing-game-page/turn-summary/turn-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    GameFormComponent,
    NewGamePageComponent,
    OngoingGamePageComponent,
    NavigationBarComponent,
    GameNameComponent,
    PlayerInfoComponent,
    GameInfoComponent,
    CardPickerComponent,
    PickableCardComponent,
    CardTableComponent,
    PlayerHandComponent,
    ToastsContainer,
    SetUsernamePageComponent,
    PlayerNameFormComponent,
    TurnSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TranslocoRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
