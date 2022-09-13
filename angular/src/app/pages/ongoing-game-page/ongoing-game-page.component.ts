import { Component, OnInit } from '@angular/core';
import { CurrentGameService } from '../../services/current-game.service';

@Component({
  selector: 'shpp-ongoing-game-page',
  templateUrl: './ongoing-game-page.component.html',
  styleUrls: [ './ongoing-game-page.component.scss' ]
})
export class OngoingGamePageComponent {

  constructor(public currentGameService: CurrentGameService) {
  }

  revealCards(): void {
    this.currentGameService.revealCards();
  }

  endTurn(): void {
    this.currentGameService.endTurn();
  }

}
