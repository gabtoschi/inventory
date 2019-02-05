import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import { GameGenres } from './../../shared/models/game-genres';
import { GamePlatforms } from './../../shared/models/game-platforms';
import { FormValidationService } from './../../shared/services/form-validation.service';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.scss']
})
export class NewGameFormComponent implements OnInit {
  
  genres: string[] = GameGenres.sort();
  platforms: string[] = GamePlatforms.sort();

  platformsSelected: string[] = [];

  // to show alerts after submitting
  showErrorAlert: boolean = false;
  errorAlertMessage: string;
  showSuccessAlert: boolean = false;

  newGameForm: FormGroup = this.builder.group({
    name: ['', Validators.required],
    developer: [''],
    publisher: [''],
    category: [''],
    platforms: this.builder.array([]),
    selectPlatform: ['']
  });

  get platformsControl() {
    return this.newGameForm.get('platforms') as FormArray;
  }

  selectPlatform(){
    let newPlatform = this.newGameForm.get('selectPlatform').value;

    if (!this.platformsSelected.includes(newPlatform)){
      this.platformsSelected.push(newPlatform);
      this.platformsControl.push(this.builder.control(newPlatform));
    }
  }

  deselectPlatform(platform: string){
    this.platformsSelected.splice(this.platformsSelected.indexOf(platform), 1);
    
    for (let control of this.platformsControl.controls){
      if (control.value == platform){
        this.platformsControl.removeAt(this.platformsControl.controls.indexOf(control));
        break;
      }
    }
  }

  // updates valid and invalid Bootstrap classes
  updateValidationCSS(fieldName: string){
    return this.validation.updateValidationCSS(this.newGameForm.get(fieldName), true);
  }

  // resets after-submit alerts
  resetErrorAlert(){
    this.errorAlertMessage = "";
    this.showErrorAlert = false;
  }

  resetSuccessAlert(){
    this.showSuccessAlert = false;
  }

  submitForm(){
    this.resetErrorAlert();
    this.resetSuccessAlert();

    let errorMessage = null;

    if (!this.newGameForm.valid){
      errorMessage = "There are errors below. Please check all fields."

      Object.keys(this.newGameForm.controls).forEach(key => {
        let control = this.newGameForm.controls[key];

        if (control.invalid){
          control.markAsTouched();
        }
      });

    } else {
      //errorMessage = this.auth.registerUser(this.newUser);
    }

    if (errorMessage != null){
      this.errorAlertMessage = errorMessage;
      this.showErrorAlert = true;
    } else {
      this.showSuccessAlert = true;

      Object.keys(this.newGameForm.controls).forEach(key => {
        let control = this.newGameForm.controls[key];

        control.markAsUntouched();
        control.reset();
      });

      this.resetSelects();
    }
  }

  constructor(
    private builder: FormBuilder,
    private validation: FormValidationService
  ) { }

  ngOnInit() {
    this.resetSelects();
  }

  resetSelects(){
    this.newGameForm.get('selectPlatform').setValue(this.platforms[0]);
    this.newGameForm.get('category').setValue(this.genres[0]);
    this.platformsSelected = [];

    for (let i = 0; i < this.platformsControl.controls.length; i++){
      this.platformsControl.removeAt(i);
    }
  }

}
