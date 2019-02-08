import { Directive, Input } from '@angular/core';
import { ValidatorFn, ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function stringMatchValidator(match: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return match && control.value && match === control.value
      ? null : { 'passwordMatch' : true };
  };
}

@Directive({
  selector: '[stringMatch]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: StringMatchValidatorDirective, multi: true}
  ]
})
export class StringMatchValidatorDirective {

  @Input('stringMatch') stringToMatch: string;

  public validate(control: AbstractControl): ValidationErrors {
    return stringMatchValidator(this.stringToMatch)(control);
  }

  constructor() { }

}
