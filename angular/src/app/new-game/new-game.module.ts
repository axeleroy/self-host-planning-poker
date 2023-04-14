import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewGamePageComponent } from './new-game-page.component';
import { NewGameRoutingModule } from './new-game-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GameFormComponent } from '../shared/game-form/game-form.component';
import { TranslocoRootModule } from '../transloco-root.module';
import { ContainerComponent } from '../shared/container/container.component';


@NgModule({
  declarations: [ NewGamePageComponent ],
  imports: [
    CommonModule,
    NewGameRoutingModule,
    TranslocoRootModule,
    HttpClientModule,
    ContainerComponent,
    GameFormComponent
  ]
})
export class NewGameModule { }
