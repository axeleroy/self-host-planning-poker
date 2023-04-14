import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerNameFormComponent } from './player-name-form/player-name-form.component';
import { PlayerInfoComponent } from './nav-player-info/player-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbOffcanvasModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslocoRootModule } from '../transloco-root.module';


@NgModule({
  declarations: [
    PlayerNameFormComponent,
    PlayerInfoComponent
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    TranslocoLocaleModule,
    ReactiveFormsModule,
    NgbOffcanvasModule,
    NgbTooltipModule
  ],
  exports: [
    PlayerNameFormComponent,
    PlayerInfoComponent
  ]
})
export class PlayerInfoModule { }
