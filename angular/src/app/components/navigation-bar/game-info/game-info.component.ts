import { Component } from '@angular/core';
import { GameInfo } from '../../../model/events';
import { CurrentGameService } from '../../../services/current-game.service';
import { Deck } from '../../../model/deck';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shpp-game-info',
  templateUrl: './game-info.component.html',
  styles: [
  ]
})
export class GameInfoComponent {

  currentGameInfo?: GameInfo | null;

  constructor(private currentGameService: CurrentGameService,
              private offcanvaseService: NgbOffcanvas) {
    this.currentGameService.gameInfo$.subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  openEdit(content: any): void {
    this.offcanvaseService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'})
      .result
      .then((result: {name: string, deck: Deck}) => {
        this.currentGameService.setDeck(result.deck);
        this.currentGameService.renameGame(result.name);
      })
  }

}
