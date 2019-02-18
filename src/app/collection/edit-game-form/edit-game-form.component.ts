import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GamesService } from './../games.service';
import { FormValidationService } from './../../shared/services/form-validation.service';
import { Game } from 'src/app/shared/models/game';
import { GameMetadataService, GameMetadataType } from './../../shared/services/game-metadata.service';

@Component({
  selector: 'app-edit-game-form',
  templateUrl: './edit-game-form.component.html',
  styleUrls: ['./edit-game-form.component.scss']
})
export class EditGameFormComponent implements OnInit, OnDestroy {

  private gameToEdit: Game;
  private gameToEditSub: Subscription;

  public genres: string[];
  public platforms: string[];

  public platformsSelected: string[] = [];

  public isDataReady = false;

  // to show alerts after submitting
  public showErrorAlert = false;
  public errorAlertMessage: string;

  public editGameForm: FormGroup = this.builder.group({
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

  constructor(
    private builder: FormBuilder,
    private validation: FormValidationService,
    private gamesServ: GamesService,
    private route: ActivatedRoute,
    private router: Router,
    private metadataServ: GameMetadataService
  ) { }

  public ngOnInit() {
    this.metadataServ.getMetadata(GameMetadataType.Genres).subscribe(
      (genres => {
        this.genres = genres.sort();
      })
    );

    this.metadataServ.getMetadata(GameMetadataType.Platforms).subscribe(
      (platforms => {
        this.platforms = platforms.sort();
        this.editGameForm.get('selectPlatform').setValue(this.platforms[0]);
      })
    );

    this.gameToEditSub = this.route.data.subscribe(
      (data: {gamedata: Game}) => {
        if (data.gamedata == null) {
          this.router.navigate(['/collection']);
        } else {
          this.gameToEdit = data.gamedata;
          this.isDataReady = true;
          this.startEditForm();
        }
      }
    );
  }

  public ngOnDestroy() {
    this.gameToEditSub.unsubscribe();
  }

  public selectPlatform() {
    const newPlatform = this.editGameForm.get('selectPlatform').value;

    if (!this.platformsSelected.includes(newPlatform)) {
      this.platformsSelected.push(newPlatform);
      this.platformsControl.push(this.builder.control(newPlatform));
    }
  }

  public deselectPlatform(platform: string) {
    this.platformsSelected.splice(this.platformsSelected.indexOf(platform), 1);

    for (const control of this.platformsControl.controls) {
      if (control.value === platform) {
        this.platformsControl.removeAt(this.platformsControl.controls.indexOf(control));
        break;
      }
    }
  }

  // updates valid and invalid Bootstrap classes
  public updateValidationCSS(fieldName: string) {
    return this.validation.updateValidationCSS(this.editGameForm.get(fieldName), true);
  }

  // resets after-submit alerts
  public resetErrorAlert() {
    this.errorAlertMessage = '';
    this.showErrorAlert = false;
  }

  public submitForm() {
    this.resetErrorAlert();

    let errorMessage = null;

    if (!this.editGameForm.valid) {
      errorMessage = 'There are errors below. Please check all fields.';

      Object.keys(this.editGameForm.controls).forEach(key => {
        const control = this.editGameForm.controls[key];

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
        this.editGameForm.get('name').value,
        this.editGameForm.get('developer').value,
        this.editGameForm.get('publisher').value,
        this.editGameForm.get('category').value,
        platforms
      );

      errorMessage = this.gamesServ.editGame(newGame, this.gameToEdit.slug);
    }

    if (errorMessage != null) {
      this.errorAlertMessage = errorMessage;
      this.showErrorAlert = true;
    } else {
      this.router.navigate(['/collection']);
    }
  }

  public startEditForm() {
    this.editGameForm.patchValue({
      slug: this.gameToEdit.slug,
      name: this.gameToEdit.name,
      developer: this.gameToEdit.developer,
      publisher: this.gameToEdit.publisher,
      category: this.gameToEdit.category,
    });

    for (const plat of this.gameToEdit.platforms) {
      this.platformsSelected.push(plat);
      this.platformsControl.push(this.builder.control(plat));
    }
  }

}
