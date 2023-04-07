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
    loadChildren: () => import('./new-game/new-game.module').then(m => m.NewGameModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./ongoing-game/ongoing-game.module').then(m => m.OngoingGameModule)
  },
  {
    path: 'set-username',
    loadChildren: () => import('./set-username/set-username.module').then(m => m.SetUsernameModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
