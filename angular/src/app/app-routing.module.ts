import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGamePageComponent } from './pages/new-game-page/new-game-page.component';
import { OngoingGamePageComponent } from './pages/ongoing-game-page/ongoing-game-page.component';

const routes: Routes = [
  {
    path: '',
    component: NewGamePageComponent
  },
  {
    path: 'game/:gameId',
    component: OngoingGamePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
