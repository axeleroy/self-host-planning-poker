import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsernameSetGuard } from '../player-info/username-set.guard';
import { OngoingGamePageComponent } from './ongoing-game-page.component';
import { CurrentGameService } from './current-game.service';

const routes: Routes = [
  {
    path: ':gameId',
    component: OngoingGamePageComponent,
    canActivate: [ UsernameSetGuard, CurrentGameService ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OngoingGameRoutingModule { }
