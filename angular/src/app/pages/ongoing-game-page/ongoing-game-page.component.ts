import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'spp-ongoing-game-page',
  templateUrl: './ongoing-game-page.component.html',
  styles: [
  ]
})
export class OngoingGamePageComponent implements OnInit {
  gameId: string;

  constructor(private route: ActivatedRoute) {
    this.gameId = this.route.snapshot.params['gameId'];
  }

  ngOnInit(): void {
  }

}
