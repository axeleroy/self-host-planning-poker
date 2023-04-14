import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'game',
    loadChildren: () => import('./ongoing-game/ongoing-game.module').then(m => m.OngoingGameModule)
  },
  {
    path: 'set-username',
    loadComponent: () => import('./set-username/set-username-page.component').then(m => m.SetUsernamePageComponent)
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
