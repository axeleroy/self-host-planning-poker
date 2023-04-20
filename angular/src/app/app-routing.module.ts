import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usernameSetGuard } from './shared/user-info/username-set.service';
import { canActivateGame } from './ongoing-game/current-game.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    loadComponent: () => import('./new-game/new-game-page.component').then(m => m.NewGamePageComponent),
    title: 'Self-Host Planning Poker'
  },
  {
    path: 'game/:gameId',
    loadComponent: () => import('./ongoing-game/ongoing-game-page.component').then(m => m.OngoingGamePageComponent),
    canActivate: [ usernameSetGuard, canActivateGame ]
  },
  {
    path: 'set-username',
    loadComponent: () => import('./set-username/set-username-page.component').then(m => m.SetUsernamePageComponent)
  },
  {
    path: '**',
    redirectTo: 'new'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
