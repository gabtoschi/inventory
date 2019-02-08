import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  // checks if a field is invalid after touching it
  public isFieldInvalid(field: FormControl | AbstractControl) {
    return field.touched && field.invalid;
  }

  // checks if a field is invalid after touching it
  public isFieldValid(field: FormControl | AbstractControl) {
    return field.touched && field.valid;
  }

  // updates valid and invalid Bootstrap classes
  public updateValidationCSS(field: FormControl | AbstractControl, onlyError: boolean) {
    return {
      'is-invalid': this.isFieldInvalid(field),
      'is-valid': onlyError ? false : this.isFieldValid(field)
    };
  }

}
