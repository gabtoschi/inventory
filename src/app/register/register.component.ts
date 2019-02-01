import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel, NgForm } from '@angular/forms';

import { NewUserData } from '../shared/models/new-user-data';
import { FormValidationService } from './../shared/services/form-validation.service';
import { AuthService } from './../shared/services/auth.service';

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

  // to show alerts after submitting
  showErrorAlert: boolean = false;
  errorAlertMessage: string;
  showSuccessAlert: boolean = false;

  // sends the data to the module to confirm the register
  confirmRegister(form: NgForm){
    this.resetErrorAlert();
    this.resetSuccessAlert();

    let errorMessage = null;

    if (!form.valid){
      errorMessage = "There are errors below. Please check all fields."

      Object.keys(form.controls).forEach(key => {
        let control = form.controls[key];

        if (control.invalid){
          control.markAsTouched();
        }
      });

    } else {
      errorMessage = this.auth.registerUser(this.newUser);
    }

    if (errorMessage != null){
      this.errorAlertMessage = errorMessage;
      this.showErrorAlert = true;
    } else {
      this.showSuccessAlert = true;

      Object.keys(form.controls).forEach(key => {
        let control = form.controls[key];

        control.markAsUntouched();
        control.reset();
      });
    }

    console.log(form);
    console.log(this.newUser);
    console.log(this.passwordConfirm);
  }

  // resets after-submit alerts
  resetErrorAlert(){
    this.errorAlertMessage = "";
    this.showErrorAlert = false;
  }

  resetSuccessAlert(){
    this.showSuccessAlert = false;
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
    private validation: FormValidationService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

}
