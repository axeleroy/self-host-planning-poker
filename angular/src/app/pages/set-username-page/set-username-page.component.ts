import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInformationService } from '../../services/user-information.service';

@Component({
  selector: 'shpp-set-username-page',
  templateUrl: './set-username-page.component.html',
  styles: [
  ]
})
export class SetUsernamePageComponent implements OnInit {
  formGroup: FormGroup;
  gameId?: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userInformation: UserInformationService) {
    this.formGroup = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.gameId = params['gameId']);
  }

  join(): void {
    let username = this.formGroup.get('username')?.value;
    this.userInformation.setName(username);
    this.router.navigate(['game', this.gameId]);
  }

}
