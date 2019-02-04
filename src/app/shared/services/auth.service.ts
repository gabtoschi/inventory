import { AuthGuard } from './../guards/auth.guard';
import { Injectable } from '@angular/core';

import { NewUserData } from '../models/new-user-data';
import { LoginData } from './../models/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // placeholder for tests
  _registeredUsers: NewUserData[] = [
    {name: 'PH', email: 'a@a', password: '12'}
  ];
  _currentUser: NewUserData = null;
  
  // reference for auth guard
  static isLoggedIn: boolean = true;

  // confirm a user registration
  registerUser(newUser: NewUserData): null | string {
    // placeholder for tests

    let alreadyExists: boolean = false;

    this._registeredUsers.forEach((user) => {
      if (user.email === newUser.email){
        alreadyExists = true;
      }
    });

    if (alreadyExists) return ("Already exists a registered user with this e-mail.");

    let user = new NewUserData();
    user.email = newUser.email;
    user.name = newUser.name;
    user.password = newUser.password;

    this._registeredUsers.push(user);

    console.log("REGISTERED");
    console.log(this._registeredUsers);
    return null;
  }

  // confirm a user login
  loginUser(login: LoginData): null | string {
    // placeholder for tests

    let userRegistered: boolean = false;

    this._registeredUsers.forEach((user) => {
      if (user.email === login.email && user.password === login.password){
        userRegistered = true;
        this._currentUser = user;
      }
    });

    AuthService.isLoggedIn = userRegistered;
    return userRegistered ? null : "E-mail or password wrong.";
  }

  // make a user logout
  logoutUser(): boolean {
    if (AuthService.isLoggedIn){
      AuthService.isLoggedIn = false;
      return true;
    } return false;
  }

  constructor() { }
}
