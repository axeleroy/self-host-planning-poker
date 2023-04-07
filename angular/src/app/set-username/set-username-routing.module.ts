import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetUsernamePageComponent } from './set-username-page.component';

const routes: Routes = [
  { path: '**', component: SetUsernamePageComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class SetUsernameRoutingModule { }
