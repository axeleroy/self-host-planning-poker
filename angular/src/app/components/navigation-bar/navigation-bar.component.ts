import { Component, OnInit } from '@angular/core';
import { UserInformationService } from '../../services/user-information.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'spp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styles: [
  ]
})
export class NavigationBarComponent {
  formControl: FormControl;

  constructor(private fb: FormBuilder,
              public userInformation: UserInformationService) {
    this.formControl = this.fb.control(this.userInformation.getName(),
      { validators: [Validators.required, Validators.minLength(1)] });
  }

  toggleSpectator(): void {
    this.userInformation.setSpectator(!this.userInformation.isSpectator());
  }

  changeName(): void {
    const newName = this.formControl.value;
    this.userInformation.setName(newName);
  }

}
