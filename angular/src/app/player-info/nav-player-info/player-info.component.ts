import { Component } from '@angular/core';
import { NgbOffcanvas, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserInformationService } from '../user-information.service';
import { PlayerNameFormComponent } from '../player-name-form/player-name-form.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'shpp-player-info',
    templateUrl: './player-info.component.html',
    standalone: true,
    imports: [TranslocoModule, PlayerNameFormComponent, NgbTooltip]
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
