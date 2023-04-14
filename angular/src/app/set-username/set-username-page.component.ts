import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoRootModule } from '../transloco-root.module';
import { ContainerComponent } from '../shared/container/container.component';
import { PlayerNameFormComponent } from '../player-info/player-name-form/player-name-form.component';

@Component({
  standalone: true,
  selector: 'shpp-set-username-page',
  templateUrl: './set-username-page.component.html',
  imports: [ PlayerNameFormComponent, TranslocoRootModule, ContainerComponent ]
})
export class SetUsernamePageComponent implements OnInit {
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
