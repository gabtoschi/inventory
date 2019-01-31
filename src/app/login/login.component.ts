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

  loginData: LoginData = {
    email: null,
    password: null
  }

  submitLogin(form){
    console.log(this.loginData);
  }

  updateValidationCSS(field: FormControl){
    return this.validation.updateValidationCSS(field);
  }

  constructor(
    private validation: FormValidationService
  ) { }

  ngOnInit() {
  }

}
