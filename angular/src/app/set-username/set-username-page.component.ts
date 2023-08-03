import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '../shared/container/container.component';
import { PlayerNameFormComponent } from '../shared/player-name-form/player-name-form.component';
import { NavAppTitleComponent } from '../navigation-bar/app-title/nav-app-title.component';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'shpp-set-username-page',
  templateUrl: './set-username-page.component.html',
  imports: [TranslocoDirective, PlayerNameFormComponent, ContainerComponent, NavAppTitleComponent]
})
export default class SetUsernamePageComponent implements OnInit {
  gameId?: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.gameId = params['gameId']);
  }

  join(): void {
    this.router.navigate(['game', this.gameId]);
  }

}
