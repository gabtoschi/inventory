import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import { FormValidationService } from './../../shared/services/form-validation.service';
import { GameMetadataService, GameMetadataType } from './../../shared/services/game-metadata.service';
import { GamesService } from './../games.service';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.scss']
})
export class NewGameFormComponent implements OnInit {

  public genres: string[];

  public platforms: string[];
  public allPlatforms: string[];

  public platformsSelected: string[] = [];

  // to show alerts after submitting
  public showErrorAlert = false;
  public errorAlertMessage: string;
  public showSuccessAlert = false;

  public newGameForm: FormGroup = this.builder.group({
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

  constructor(
    private builder: FormBuilder,
    private validation: FormValidationService,
    private gamesServ: GamesService,
    private metadataServ: GameMetadataService
  ) { }

  public ngOnInit() {
    this.metadataServ.getMetadata(GameMetadataType.Genres).subscribe(
      (genres => {
        this.genres = genres.sort();
        this.resetGenreSelect();
      })
    );

    this.metadataServ.getMetadata(GameMetadataType.Platforms).subscribe(
      (platforms => {
        this.allPlatforms = platforms.sort();
        this.resetPlatformSelect();
      })
    );
  }

  public selectPlatform() {
    const newPlatform = this.newGameForm.get('selectPlatform').value;

    if (!this.platformsSelected.includes(newPlatform)) {
      this.platformsSelected.push(newPlatform);
      this.platformsControl.push(this.builder.control(newPlatform));

      this.platforms.splice(this.platforms.indexOf(newPlatform), 1);
    }
  }

  public deselectPlatform(platform: string) {
    this.platformsSelected.splice(this.platformsSelected.indexOf(platform), 1);

    this.platforms.push(platform);
    this.platforms.sort();

    for (const control of this.platformsControl.controls) {
      if (control.value === platform) {
        this.platformsControl.removeAt(this.platformsControl.controls.indexOf(control));
        break;
      }
    }
  }

  // updates valid and invalid Bootstrap classes
  public updateValidationCSS(fieldName: string) {
    return this.validation.updateValidationCSS(this.newGameForm.get(fieldName), true);
  }

  // resets after-submit alerts
  public resetErrorAlert() {
    this.errorAlertMessage = '';
    this.showErrorAlert = false;
  }

  public resetSuccessAlert() {
    this.showSuccessAlert = false;
  }

  public submitForm() {
    this.resetErrorAlert();
    this.resetSuccessAlert();

    let errorMessage = null;

    if (!this.newGameForm.valid) {
      errorMessage = 'There are errors below. Please check all fields.';

      Object.keys(this.newGameForm.controls).forEach(key => {
        const control = this.newGameForm.controls[key];

        if (control.invalid) {
          control.markAsTouched();
        }
      });

    } else {
      const platforms: string[] = [];

      for (const control of this.platformsControl.controls) {
        if (control.value != null) {
          platforms.push(control.value);
        }
      }

      const newGame = new Game(
        this.newGameForm.get('name').value,
        this.newGameForm.get('developer').value,
        this.newGameForm.get('publisher').value,
        this.newGameForm.get('category').value,
        platforms
      );

      errorMessage = this.gamesServ.addNewGame(newGame);
    }

    if (errorMessage != null) {
      this.errorAlertMessage = errorMessage;
      this.showErrorAlert = true;
    } else {
      this.showSuccessAlert = true;

      Object.keys(this.newGameForm.controls).forEach(key => {
        const control = this.newGameForm.controls[key];

        control.markAsUntouched();
        control.reset();
      });

      this.resetSelects();
    }
  }

  private resetPlatformSelect() {
    this.platforms = this.allPlatforms.map(x => x);

    this.newGameForm.get('selectPlatform').setValue(this.platforms[0]);
    this.platformsSelected = [];

    for (let i = 0; i < this.platformsControl.controls.length; i++) {
      this.platformsControl.removeAt(i);
    }
  }

  private resetGenreSelect() {
    this.newGameForm.get('category').setValue(this.genres[0]);
  }

  private resetSelects() {
    this.resetPlatformSelect();
    this.resetGenreSelect();
  }

}
