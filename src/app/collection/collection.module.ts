import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CommaListPipe } from './../shared/pipes/comma-list.pipe';

import { AlertModule } from 'ngx-bootstrap';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameFormComponent } from './new-game-form/new-game-form.component';


@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    GameDetailComponent,
    CommaListPipe,
    NewGameFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CollectionRoutingModule,
    AlertModule.forRoot()
  ]
})
export class CollectionModule { }
