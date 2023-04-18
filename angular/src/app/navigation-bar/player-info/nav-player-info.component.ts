import { Component } from '@angular/core';
import { NgbOffcanvas, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserInformationService } from '../../shared/user-info/user-information.service';
import { PlayerNameFormComponent } from '../../shared/player-name-form/player-name-form.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'shpp-nav-player-info',
    templateUrl: './nav-player-info.component.html',
    standalone: true,
    imports: [TranslocoModule, PlayerNameFormComponent, NgbTooltip]
})
export class NavPlayerInfoComponent {
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
