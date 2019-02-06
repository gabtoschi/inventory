import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GamesService } from './../games.service';
import { FormValidationService } from './../../shared/services/form-validation.service';
import { Game } from 'src/app/shared/models/game';
import { GamePlatforms } from './../../shared/models/game-platforms';
import { GameGenres } from './../../shared/models/game-genres';

@Component({
  selector: 'app-edit-game-form',
  templateUrl: './edit-game-form.component.html',
  styleUrls: ['./edit-game-form.component.scss']
})
export class EditGameFormComponent implements OnInit, OnDestroy {
  gameToEdit: Game;
  gameToEditSub: Subscription;

  genres: string[] = GameGenres.sort();
  platforms: string[] = GamePlatforms.sort();

  platformsSelected: string[] = [];

  // to show alerts after submitting
  showErrorAlert: boolean = false;
  errorAlertMessage: string;

  editGameForm: FormGroup = this.builder.group({
    slug: ['', Validators.required],
    name: ['', Validators.required],
    developer: [''],
    publisher: [''],
    category: [''],
    platforms: this.builder.array([]),
    selectPlatform: ['']
  });

  get platformsControl() {
    return this.editGameForm.get('platforms') as FormArray;
  }

  get gameName() {
    return this.editGameForm.get('name').value as string;
  }

  selectPlatform(){
    let newPlatform = this.editGameForm.get('selectPlatform').value;

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
    return this.validation.updateValidationCSS(this.editGameForm.get(fieldName), true);
  }

  // resets after-submit alerts
  resetErrorAlert(){
    this.errorAlertMessage = "";
    this.showErrorAlert = false;
  }

  submitForm(){
    this.resetErrorAlert();

    let errorMessage = null;

    if (!this.editGameForm.valid){
      errorMessage = "There are errors below. Please check all fields."

      Object.keys(this.editGameForm.controls).forEach(key => {
        let control = this.editGameForm.controls[key];

        if (control.invalid){
          control.markAsTouched();
        }
      });

    } else {
      let platforms: string[] = [];
      for (let control of this.platformsControl.controls)
        if (control.value != null) platforms.push(control.value);

      let newGame = new Game(
        this.editGameForm.get('name').value,
        this.editGameForm.get('developer').value,
        this.editGameForm.get('publisher').value,
        this.editGameForm.get('category').value,
        platforms
      );

      errorMessage = this.gamesServ.editGame(newGame, this.gameToEdit.slug);
    }

    if (errorMessage != null){
      this.errorAlertMessage = errorMessage;
      this.showErrorAlert = true;
    } else {
      this.router.navigate(['/collection', this.gameToEdit.slug, 'view']);
    }
  }

  resetSelects(){
    this.editGameForm.get('selectPlatform').setValue(this.platforms[0]);
    this.editGameForm.get('category').setValue(this.genres[0]);
  }

  startEditForm(){
    this.resetSelects();

    this.editGameForm.patchValue({
      slug: this.gameToEdit.slug,
      name: this.gameToEdit.name,
      developer: this.gameToEdit.developer,
      publisher: this.gameToEdit.publisher,
      category: this.gameToEdit.category,
    });

    for (let plat of this.gameToEdit.platforms){
      this.platformsSelected.push(plat);
      this.platformsControl.push(this.builder.control(plat));
    }
  }

  constructor(
    private builder: FormBuilder,
    private validation: FormValidationService,
    private gamesServ: GamesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameToEditSub = this.route.params.subscribe(
      (params: any) => {
        let slug = params['slug'];
        this.gameToEdit = this.gamesServ.getGameBySlug(slug);
      }
    );

    if (this.gameToEdit == null){
      this.router.navigate(['/collection']);
    }

    this.startEditForm();
  }

  ngOnDestroy() {
    this.gameToEditSub.unsubscribe();
  }

}
