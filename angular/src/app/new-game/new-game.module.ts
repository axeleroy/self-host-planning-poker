import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGamePageComponent } from './new-game-page.component';
import { NewGameRoutingModule } from './new-game-routing.module';
import { GameFormModule } from '../game-form/game-form.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ NewGamePageComponent ],
  imports: [
    CommonModule,
    NewGameRoutingModule,
    GameFormModule,
    SharedModule,
    HttpClientModule
  ]
})
export class NewGameModule { }
