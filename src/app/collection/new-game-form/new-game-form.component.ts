import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { GameGenres } from './../../shared/models/game-genres';
import { GamePlatforms } from './../../shared/models/game-platforms';

@Component({
  selector: 'app-new-game-form',
  templateUrl: './new-game-form.component.html',
  styleUrls: ['./new-game-form.component.scss']
})
export class NewGameFormComponent implements OnInit {
  
  genres: string[] = GameGenres.sort();
  platforms: string[] = GamePlatforms.sort();

  platformsSelected: string[] = [];

  newGameForm: FormGroup = this.builder.group({
    name: [''],
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

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.newGameForm.get('selectPlatform').setValue(this.platforms[0]);
  }

}
