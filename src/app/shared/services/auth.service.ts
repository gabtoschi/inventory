import { AuthGuard } from './../guards/auth.guard';
import { Injectable } from '@angular/core';

import { NewUserData } from '../models/new-user-data';
import { LoginData } from './../models/login-data';
import { ErrorsService } from 'src/app/error-notificator/errors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/user';
  // reference for auth guard
  static isLoggedIn = false;

  // placeholder for tests
  public _registeredUsers: NewUserData[] = [
    {name: 'root', email: 'root@root', password: 'root'}
  ];
  public _currentUser: NewUserData = null;

  constructor() { }

  // confirm a user registration
  public registerUser(newUser: NewUserData): null | string {
    // placeholder for tests

    let alreadyExists = false;

    this._registeredUsers.forEach((userIt: NewUserData) => {
      if (userIt.email === newUser.email) {
        alreadyExists = true;
      }
    });

    if (alreadyExists) {
      return ('Already exists a registered user with this e-mail.');
    }

    const user = new NewUserData();
    user.email = newUser.email;
    user.name = newUser.name;
    user.password = newUser.password;

    this._registeredUsers.push(user);

    return null;
  }

  // confirm a user login
  public loginUser(login: LoginData): null | string {
    // placeholder for tests

    let userRegistered = false;

    this._registeredUsers.forEach((user) => {
      if (user.email === login.email && user.password === login.password) {
        userRegistered = true;
        this._currentUser = user;
      }
    });

    AuthService.isLoggedIn = userRegistered;
    return userRegistered ? null : 'E-mail or password wrong.';
  }

  // make a user logout
  public logoutUser(): boolean {
    if (AuthService.isLoggedIn) {
      AuthService.isLoggedIn = false;
      return true;
    } return false;
  }

}
