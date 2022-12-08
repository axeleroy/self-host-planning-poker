import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInformationService } from '../../../services/user-information.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'shpp-player-info',
  templateUrl: './player-info.component.html'
})
export class PlayerInfoComponent implements OnInit, OnDestroy {
  show = false;
  private subscription?: Subscription;

  constructor(public userInformation: UserInformationService,
              private offcanvaseService: NgbOffcanvas,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    )
    .subscribe(() => this.show = this.route.firstChild?.snapshot.data['displayPlayerInfo']);
  }

  toggleSpectator(): void {
    this.userInformation.setSpectator(!this.userInformation.isSpectator());
  }

  openEdit(content: any): void {
    this.offcanvaseService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
