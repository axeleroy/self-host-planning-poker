import { Component } from '@angular/core';
import { Deck } from '../model/deck';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TranslocoRootModule } from '../transloco-root.module';
import { GameFormComponent } from '../shared/game-form/game-form.component';
import { NgFor } from '@angular/common';
import { ContainerComponent } from '../shared/container/container.component';

@Component({
  standalone: true,
  selector: 'shpp-new-game-page',
  templateUrl: './new-game-page.component.html',
  styleUrls: [ './new-game-page.component.scss' ],
  imports: [ TranslocoRootModule, HttpClientModule, GameFormComponent, ContainerComponent, NgFor ]
})
export class NewGamePageComponent {

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
