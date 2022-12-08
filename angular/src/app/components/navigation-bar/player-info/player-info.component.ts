import { Component } from '@angular/core';
import { UserInformationService } from '../../../services/user-information.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'shpp-player-info',
  templateUrl: './player-info.component.html',
  styles: [
  ]
})
export class PlayerInfoComponent {

  constructor(public userInformation: UserInformationService,
              private offcanvaseService: NgbOffcanvas) {
  }

  toggleSpectator(): void {
    this.userInformation.setSpectator(!this.userInformation.isSpectator());
  }

  openEdit(content: any): void {
    this.offcanvaseService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' });
  }
}
