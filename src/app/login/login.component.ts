import { Component, OnInit } from '@angular/core';

import { LoginData } from './../shared/models/login-data';

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
    
  }

  constructor() { }

  ngOnInit() {
  }

}
