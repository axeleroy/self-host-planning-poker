import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'shpp-set-username-page',
  templateUrl: './set-username-page.component.html'
})
export class SetUsernamePageComponent implements OnInit {
  gameId?: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.gameId = params['gameId']);
  }

  join(): void {
    this.router.navigate(['game', this.gameId]);
  }

}
