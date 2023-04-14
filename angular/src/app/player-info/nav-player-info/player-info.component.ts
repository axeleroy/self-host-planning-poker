import { Component } from '@angular/core';
import { NgbOffcanvas, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserInformationService } from '../user-information.service';

@Component({
  selector: 'shpp-player-info',
  templateUrl: './player-info.component.html'
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
