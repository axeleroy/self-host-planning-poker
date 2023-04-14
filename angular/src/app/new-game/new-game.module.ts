import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGamePageComponent } from './new-game-page.component';
import { NewGameRoutingModule } from './new-game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { GameFormComponent } from '../game-form/game-form.component';


@NgModule({
  declarations: [ NewGamePageComponent ],
  imports: [
    CommonModule,
    NewGameRoutingModule,
    SharedModule,
    HttpClientModule,
    GameFormComponent
  ]
})
export class NewGameModule { }
