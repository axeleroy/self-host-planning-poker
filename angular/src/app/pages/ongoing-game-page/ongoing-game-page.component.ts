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

  constructor(private currentGameService: CurrentGameService) {
    this.currentGameService.state$.subscribe((state) => console.log(JSON.stringify(state)));
  }

  ngOnInit(): void {
  }

}
