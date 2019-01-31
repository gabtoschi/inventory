import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

import { NewUserData } from '../shared/models/new-user-data';


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

  // checks if a field is invalid after touching it
  isFieldInvalid(field: FormControl){
    return field.touched && field.invalid;
  }

  // checks if a field is invalid after touching it
  isFieldValid(field: FormControl){
    return field.touched && field.valid;
  }

  // updates valid and invalid Bootstrap classes
  updateValidationCSS(field: FormControl){
    return {
      'is-invalid': this.isFieldInvalid(field),
      'is-valid': this.isFieldValid(field),
    }
  }

  // clear password confirmation when a new password entered
  clearPasswordConf(passwordConfField: NgModel){
    console.log(passwordConfField);
    passwordConfField.control.markAsUntouched();
    this.passwordConfirm = null;
  }

  constructor() { }

  ngOnInit() {
  }

}
