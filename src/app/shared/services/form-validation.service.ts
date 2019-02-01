import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  // checks if a field is invalid after touching it
  isFieldInvalid(field: FormControl | AbstractControl){
    return field.touched && field.invalid;
  }

  // checks if a field is invalid after touching it
  isFieldValid(field: FormControl | AbstractControl){
    return field.touched && field.valid;
  }

  // updates valid and invalid Bootstrap classes
  updateValidationCSS(field: FormControl | AbstractControl){
    return {
      'is-invalid': this.isFieldInvalid(field),
      'is-valid': this.isFieldValid(field),
    }
  }

  constructor() { }
}
