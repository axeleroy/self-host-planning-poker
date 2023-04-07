import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGamePageComponent } from './new-game-page.component';

const routes: Routes = [
  {
    path: '',
    component: NewGamePageComponent,
    title: 'Self-Host Planning Poker'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NewGameRoutingModule { }
