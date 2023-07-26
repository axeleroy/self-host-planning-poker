import { Component } from '@angular/core';
import { Deck } from '../model/deck';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { GameFormComponent } from '../shared/game-form/game-form.component';
import { ContainerComponent } from '../shared/container/container.component';
import { NavAppTitleComponent } from '../navigation-bar/app-title/nav-app-title.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  standalone: true,
  selector: 'shpp-new-game-page',
  templateUrl: './new-game-page.component.html',
  styleUrls: [ './new-game-page.component.scss' ],
  imports: [
    GameFormComponent,
    ContainerComponent,
    NavAppTitleComponent,
    FooterComponent
  ]
})
export default class NewGamePageComponent {

  constructor(private http: HttpClient,
              private router: Router) { }

  onNewGame(newGame: {name: string, deck: Deck}): void {
    const body = {
      name: newGame.name,
      deck: newGame.deck.name
    }
    this.http.post(environment.urlRoot + '/create', body, { responseType: 'text' })
      .subscribe((gameId) => this.router.navigate(['game', gameId]));
  }

}
