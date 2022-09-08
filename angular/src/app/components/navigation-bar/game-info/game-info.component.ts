import { Component, OnInit } from '@angular/core';
import { GameInfo } from '../../../model/events';
import { CurrentGameService } from '../../../services/current-game.service';

@Component({
  selector: 'shpp-game-info',
  templateUrl: './game-info.component.html',
  styles: [
  ]
})
export class GameInfoComponent implements OnInit {

  currentGameInfo?: GameInfo | null;

  constructor(private currentGameService: CurrentGameService) {
    this.currentGameService.gameInfo$.subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  ngOnInit(): void {
  }

}
