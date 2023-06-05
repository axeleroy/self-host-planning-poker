import {enableProdMode, importProvidersFrom} from '@angular/core';


import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {TranslocoRootModule} from './app/transloco-root.module';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, Routes} from "@angular/router";
import {usernameSetGuard} from "./app/shared/user-info/username-set.service";
import {canActivateGame} from "./app/ongoing-game/current-game.service";
import {provideHttpClient} from "@angular/common/http";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'new',
    loadComponent: () => import('./app/new-game/new-game-page.component').then(m => m.NewGamePageComponent),
    title: 'Self-Host Planning Poker'
  },
  {
    path: 'game/:gameId',
    loadComponent: () => import('./app/ongoing-game/ongoing-game-page.component').then(m => m.OngoingGamePageComponent),
    canActivate: [ usernameSetGuard, canActivateGame ],
    providers: [ provideHttpClient() ]
  },
  {
    path: 'set-username',
    loadComponent: () => import('./app/set-username/set-username-page.component').then(m => m.SetUsernamePageComponent)
  },
  {
    path: '**',
    redirectTo: 'new'
  }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(TranslocoRootModule, TranslocoLocaleModule), provideRouter(routes)]
})
  .catch(err => console.error(err));
