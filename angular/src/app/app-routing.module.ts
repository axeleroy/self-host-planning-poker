import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGamePageComponent } from './pages/new-game-page/new-game-page.component';
import { OngoingGamePageComponent } from './pages/ongoing-game-page/ongoing-game-page.component';
import { CurrentGameService } from './services/current-game.service';

const routes: Routes = [
  {
    path: '',
    component: NewGamePageComponent,
    title: 'Self-Host Planning Poker'
  },
  {
    path: 'game/:gameId',
    component: OngoingGamePageComponent,
    canActivate: [ CurrentGameService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
