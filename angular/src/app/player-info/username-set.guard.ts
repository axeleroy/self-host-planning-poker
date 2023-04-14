import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserInformationService } from './user-information.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameSetGuard implements CanActivate {

  constructor(private userInformation: UserInformationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (!!this.userInformation.getName()) {
      return true;
    } else {
      let gameId = state.url.split('/')[2];
      return this.router.parseUrl(`/set-username?gameId=${gameId}`)
    }
  }

}
