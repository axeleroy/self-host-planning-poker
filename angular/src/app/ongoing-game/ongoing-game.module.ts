import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPickerComponent } from './card-picker/card-picker.component';
import { CardTableComponent } from './card-table/card-table.component';
import { TurnSummaryComponent } from './turn-summary/turn-summary.component';
import { OngoingGamePageComponent } from './ongoing-game-page.component';
import { PlayerInfoModule } from '../player-info/player-info.module';
import { NavGameInfoComponent } from './nav-game-info/nav-game-info.component';
import { NavGameNameComponent } from './nav-game-name/nav-game-name.component';
import { PickableCardComponent } from './card-picker/card/pickable-card.component';
import { OngoingGameRoutingModule } from './ongoing-game-routing.module';
import { PlayerHandComponent } from './card-table/player-hand/player-hand.component';
import { NgbOffcanvasModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GameFormComponent } from '../shared/game-form/game-form.component';
import { TranslocoRootModule } from '../transloco-root.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { ContainerComponent } from '../shared/container/container.component';
import { ToastService } from '../shared/toast/toast.service';



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
    TranslocoRootModule,
    TranslocoLocaleModule,
    OngoingGameRoutingModule,
    NgbOffcanvasModule,
    NgbTooltipModule,
    ContainerComponent,
    GameFormComponent
  ],
  providers: [ ToastService ]
})
export class OngoingGameModule { }
