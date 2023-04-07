import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUsernamePageComponent } from './set-username-page.component';
import { SetUsernameRoutingModule } from './set-username-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlayerInfoModule } from '../player-info/player-info.module';



@NgModule({
  declarations: [ SetUsernamePageComponent ],
  imports: [
    CommonModule,
    SetUsernameRoutingModule,
    PlayerInfoModule,
    SharedModule
  ]
})
export class SetUsernameModule { }
