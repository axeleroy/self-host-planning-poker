import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInformationService } from '../user-information.service';

@Component({
  selector: 'shpp-player-name-form',
  templateUrl: './player-name-form.component.html'
})
export class PlayerNameFormComponent {
  formGroup: FormGroup;

  @Input()
  join = false;
  @Output() validated = new EventEmitter<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userInformation: UserInformationService) {
    this.formGroup = this.fb.group({
      username: [ this.userInformation.getName(), [Validators.required, Validators.minLength(1)]]
    });
  }

  setUsername(): void {
    const username = this.formGroup.get('username')?.value;
    this.userInformation.setName(username);
    this.validated.emit();
  }

}
