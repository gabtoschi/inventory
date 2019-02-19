import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { ErrorsService } from './../../error-notificator/errors.service';
import { NewUserData } from '../models/new-user-data';
import { LoginData } from './../models/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // reference for auth guard
  static isLoggedIn = true;

  // local storage keys
  jwtStorageKey = 'inventory-token';
  expiresStorageKey = 'inventory-expires';

  // placeholder for tests
  /*public _registeredUsers: NewUserData[] = [
    {name: 'PH', email: 'a@a', password: '12'}
  ];
  public _currentUser: NewUserData = null;*/

  constructor(
    private http: HttpClient,
    private errors: ErrorsService
  ) { }

  public login(loginData: LoginData) {
    this.http.post<LoginData>('/api/login', loginData)
      .pipe(
        catchError(error => {
          this.errors.createErrorMessage('E-mail or password wrong.');
          return 'E-mail or password wrong.';
        })
      )
      .subscribe(
        (authData) => {
          this.createSession(authData);
          return null;
        }
      );
  }

  private createSession(authData) {
    const expiresAt = moment().add(authData.expiresIn, 'second');

    localStorage.setItem(this.jwtStorageKey, authData.token);
    localStorage.setItem(this.expiresStorageKey, JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem(this.jwtStorageKey);
    localStorage.removeItem(this.expiresStorageKey);
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpirationTimestamp());
  }

  private getExpirationTimestamp(): moment.Moment {
    return moment(JSON.parse(localStorage.getItem(this.expiresStorageKey)));
  }

  public getAuthToken(): string {
    return localStorage.getItem(this.jwtStorageKey);
  }

  public register(newUser: NewUserData) {
    this.http.post<NewUserData>('/api/register', newUser)
      .pipe(
        catchError(error => {
          this.errors.createErrorMessage('Something wrong happened. Try again.');
          return 'Something wrong happened. Try again.';
        })
      )
      .subscribe(
        (registerData) => {
          return null;
        }
      );
  }

/*
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
*/
}
