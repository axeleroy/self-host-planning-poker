import { Component, OnInit } from '@angular/core';
import { CurrentGameService } from '../../../services/current-game.service';
import { GameInfo } from '../../../model/events';

@Component({
  selector: 'spp-game-name',
  templateUrl: './game-name.component.html',
  styles: [
  ]
})
export class GameNameComponent implements OnInit {

  currentGameInfo?: GameInfo | null;

  constructor(private currentGameService: CurrentGameService) {
    this.currentGameService.gameInfo$.subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  ngOnInit(): void {
  }

}
