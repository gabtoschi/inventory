import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { LoginData } from './../shared/models/login-data';
import { FormValidationService } from './../shared/services/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // sync with form to obtain login data
  loginData: LoginData = {
    email: null,
    password: null
  }

  // sends the data to the module to confirm the login
  submitLogin(form){
    console.log(this.loginData);
  }

  // updates valid and invalid Bootstrap classes
  updateValidationCSS(field: FormControl){
    return this.validation.updateValidationCSS(field, true);
  }

  constructor(
    private validation: FormValidationService
  ) { }

  ngOnInit() {
  }

}
