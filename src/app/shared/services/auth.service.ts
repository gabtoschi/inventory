import { AuthGuard } from './../guards/auth.guard';
import { Injectable } from '@angular/core';

import { NewUserData } from '../models/new-user-data';
import { LoginData } from './../models/login-data';
import { ErrorsService } from 'src/app/error-notificator/errors.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(
    private http: HttpClient,
    private errors: ErrorsService) { }


  public setNewUser(user: NewUserData): string | null {
    var bcrypt = require('bcrypt-nodejs');


    this.http.post(this.apiUrl, user)
    .pipe(
      catchError(error => {
        this.errors.createErrorMessage('Something bad happened; please try again later.');
        return throwError('Something bad happened; please try again later.');
      })
    )
    
    return null;
  }
  
  




}
