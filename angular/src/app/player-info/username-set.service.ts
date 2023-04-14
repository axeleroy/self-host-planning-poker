import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserInformationService } from './user-information.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameSetService {
  canActivate(userInformation: UserInformationService,
              router: Router,
              state: RouterStateSnapshot): boolean | UrlTree {
    if (!!userInformation.getName()) {
      return true;
    } else {
      let gameId = state.url.split('/')[2];
      return router.parseUrl(`/set-username?gameId=${gameId}`)
    }
  }
}
