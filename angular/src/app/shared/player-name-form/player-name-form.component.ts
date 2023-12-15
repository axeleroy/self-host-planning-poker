import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInformationService } from '../user-info/user-information.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { debounceTime, Subject, Subscription } from "rxjs";

@Component({
    selector: 'shpp-player-name-form',
    templateUrl: './player-name-form.component.html',
    standalone: true,
    imports: [TranslocoDirective, ReactiveFormsModule]
})
export class PlayerNameFormComponent implements OnDestroy {
  formGroup: FormGroup;

  @Input()
  join = false;
  @Output() validated = new EventEmitter<void>();

  private subscription?: Subscription;
  private subject: Subject<void>

  constructor(private fb: FormBuilder,
              private userInformation: UserInformationService) {
    this.formGroup = this.fb.group({
      username: [ this.userInformation.getName(), [Validators.required, Validators.minLength(1)]]
    });

    this.subject = new Subject<void>();
    this.subscription = this.subject
    .pipe(debounceTime(1000))
    .subscribe(() => {
      const username = this.formGroup.get('username')?.value;
      this.userInformation.setName(username);
      this.validated.emit();
    });
  }

  ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

  setUsername(): void {
    this.subject.next();
  }

}
