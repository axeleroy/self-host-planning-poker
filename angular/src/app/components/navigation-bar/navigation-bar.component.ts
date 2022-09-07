import { Component } from '@angular/core';
import { UserInformationService } from '../../services/user-information.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CurrentGameService } from '../../services/current-game.service';
import { map, Observable } from 'rxjs';
import { GameInfo } from '../../model/events';

@Component({
  selector: 'spp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styles: [
  ]
})
export class NavigationBarComponent {
  formControl: FormControl;
  currentGameInfo?: GameInfo | null;

  constructor(private fb: FormBuilder,
              public userInformation: UserInformationService,
              private currentGameService: CurrentGameService) {
    this.formControl = this.fb.control(this.userInformation.getName(),
      { validators: [Validators.required, Validators.minLength(1)] });

    this.currentGameService.gameInfo$.subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  toggleSpectator(): void {
    this.userInformation.setSpectator(!this.userInformation.isSpectator());
  }

  changeName(): void {
    const newName = this.formControl.value;
    this.userInformation.setName(newName);
  }

}
