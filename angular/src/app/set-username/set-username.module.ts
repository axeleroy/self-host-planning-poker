import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetUsernamePageComponent } from './set-username-page.component';
import { SetUsernameRoutingModule } from './set-username-routing.module';
import { PlayerInfoModule } from '../player-info/player-info.module';
import { ContainerComponent } from '../shared/container/container.component';
import { TranslocoRootModule } from '../transloco-root.module';


@NgModule({
  declarations: [ SetUsernamePageComponent ],
  imports: [
    CommonModule,
    SetUsernameRoutingModule,
    PlayerInfoModule,
    TranslocoRootModule,
    ContainerComponent
  ]
})
export class SetUsernameModule { }
