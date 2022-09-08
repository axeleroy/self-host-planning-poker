import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentGameService } from '../../services/current-game.service';

@Component({
  selector: 'shpp-ongoing-game-page',
  templateUrl: './ongoing-game-page.component.html',
  styles: [
  ]
})
export class OngoingGamePageComponent implements OnInit {

  constructor(public currentGameService: CurrentGameService) {
  }

  ngOnInit(): void {
  }

}
