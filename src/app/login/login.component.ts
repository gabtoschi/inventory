import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginData } from './../shared/models/login-data';
import { FormValidationService } from './../shared/services/form-validation.service';
import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // sync with form to obtain login data
  public loginData: LoginData = {
    email: null,
    password: null
  };

  // to show alerts after submitting
  public showErrorAlert = false;
  public errorAlertMessage: string;

  constructor(
    private validation: FormValidationService,
    private auth: AuthService,
    private router: Router
  ) { }

  public ngOnInit() {
  }

  // resets after-submit alerts
  public resetErrorAlert() {
    this.errorAlertMessage = '';
    this.showErrorAlert = false;
  }

  // sends the data to the module to confirm the login
  submitLogin(form: NgForm) {
    let errorMessage = null;

    if (!form.valid) {
      errorMessage = 'There are errors below. Please check all fields.';

      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];

        if (control.invalid) {
          control.markAsTouched();
        }
      });

    } else {
      errorMessage = this.auth.loginUser(this.loginData);
    }

    if (errorMessage != null) {
      this.errorAlertMessage = errorMessage;
      this.showErrorAlert = true;
    } else {
      this.router.navigate(['/collection']);
    }

    console.log(this.loginData);
  }

  // updates valid and invalid Bootstrap classes
  public updateValidationCSS(field: FormControl) {
    return this.validation.updateValidationCSS(field, true);
  }

}
