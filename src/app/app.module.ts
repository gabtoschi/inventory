import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AlertModule, ButtonsModule } from 'ngx-bootstrap';

import { StringMatchValidatorDirective } from './shared/directives/string-match-validator.directive';

import { FormValidationService } from './shared/services/form-validation.service';
import { ErrorsService } from './error-notificator/errors.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorNotificatorComponent } from './error-notificator/error-notificator.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NavigationBarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    StringMatchValidatorDirective,
    ErrorNotificatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    FormValidationService,
    ErrorsService
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
