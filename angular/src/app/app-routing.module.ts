import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGamePageComponent } from './pages/new-game-page/new-game-page.component';
import { OngoingGamePageComponent } from './pages/ongoing-game-page/ongoing-game-page.component';
import { CurrentGameService } from './services/current-game.service';
import { UsernameSetGuard } from './services/username-set.guard';
import { SetUsernamePageComponent } from './pages/set-username-page/set-username-page.component';

const routes: Routes = [
  {
    path: '',
    component: NewGamePageComponent,
    title: 'Self-Host Planning Poker'
  },
  {
    path: 'game/:gameId',
    component: OngoingGamePageComponent,
    canActivate: [ UsernameSetGuard, CurrentGameService ],
    data: {
      displayPlayerInfo: true
    }
  },
  {
    path: 'set-username',
    component: SetUsernamePageComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
