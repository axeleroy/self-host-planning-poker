import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameFormComponent } from './game-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoRootModule } from '../transloco-root.module';



@NgModule({
  declarations: [ GameFormComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ],
  exports: [ GameFormComponent ]
})
export class GameFormModule { }
