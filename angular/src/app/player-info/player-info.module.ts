import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerNameFormComponent } from './player-name-form/player-name-form.component';
import { PlayerInfoComponent } from './nav-player-info/player-info.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlayerNameFormComponent,
    PlayerInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    PlayerNameFormComponent,
    PlayerInfoComponent
  ]
})
export class PlayerInfoModule { }
