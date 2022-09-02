import { Component, OnInit } from '@angular/core';
import { Deck } from '../../model/deck';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'spp-new-game-page',
  templateUrl: './new-game-page.component.html',
  styles: [
  ]
})
export class NewGamePageComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  onNewGame(newGame: {name: string, deck: Deck}): void {
    const body = {
      name: newGame.name,
      deck: newGame.deck.enumName
    }
    this.http.post(environment.urlRoot + 'create', body, { responseType: 'text' })
      .subscribe((gameId) => this.router.navigate(['game', gameId]));
  }

}
