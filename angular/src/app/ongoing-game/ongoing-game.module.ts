import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPickerComponent } from './card-picker/card-picker.component';
import { CardTableComponent } from './card-table/card-table.component';
import { TurnSummaryComponent } from './turn-summary/turn-summary.component';
import { OngoingGamePageComponent } from './ongoing-game-page.component';
import { PlayerInfoModule } from '../player-info/player-info.module';
import { NavGameInfoComponent } from './nav-game-info/nav-game-info.component';
import { SharedModule } from '../shared/shared.module';
import { NavGameNameComponent } from './nav-game-name/nav-game-name.component';
import { PickableCardComponent } from './card-picker/card/pickable-card.component';
import { OngoingGameRoutingModule } from './ongoing-game-routing.module';
import { PlayerHandComponent } from './card-table/player-hand/player-hand.component';
import { NgbOffcanvasModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GameFormComponent } from '../game-form/game-form.component';



@NgModule({
  declarations: [
    OngoingGamePageComponent,
    CardPickerComponent,
    CardTableComponent,
    TurnSummaryComponent,
    NavGameInfoComponent,
    NavGameNameComponent,
    PickableCardComponent,
    PlayerHandComponent,
  ],
  imports: [
    CommonModule,
    PlayerInfoModule,
    SharedModule,
    OngoingGameRoutingModule,
    NgbOffcanvasModule,
    NgbTooltipModule,
    GameFormComponent
  ]
})
export class OngoingGameModule { }
