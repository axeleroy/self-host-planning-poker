import { inject, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import { OngoingGamePageComponent } from './ongoing-game-page.component';
import { CurrentGameService } from './current-game.service';
import { UserInformationService } from '../player-info/user-information.service';
import { UsernameSetService } from '../player-info/username-set.service';

const usernameSetGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UsernameSetService).canActivate(inject(UserInformationService), inject(Router), state);
}

const canActivateGame: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CurrentGameService).canActivate(route);
}

const routes: Routes = [
  {
    path: ':gameId',
    component: OngoingGamePageComponent,
    canActivate: [ usernameSetGuard, canActivateGame ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OngoingGameRoutingModule { }
