import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

import { NewUserData } from '../shared/models/new-user-data';
import { FormValidationService } from './../shared/services/form-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // sync with form to obtain new user data
  newUser: NewUserData = {
    name: null,
    password: null,
    email: null
  };

  // to check validity of password
  passwordConfirm: string;

  // sends the data to the module to confirm the register
  confirmRegister(form){
    console.log(form);
    console.log(this.newUser);
    console.log(this.passwordConfirm);
  }

  // updates valid and invalid Bootstrap classes
  updateValidationCSS(field: FormControl){
    return this.validation.updateValidationCSS(field);
  }

  // clear password confirmation when a new password entered
  clearPasswordConf(passwordConfField: NgModel){
    passwordConfField.control.markAsUntouched();
    this.passwordConfirm = null;
  }

  constructor(
    private validation: FormValidationService
  ) { }

  ngOnInit() {
  }

}
