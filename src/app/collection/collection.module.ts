import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CommaListPipe } from './../shared/pipes/comma-list.pipe';

import { AlertModule, ModalModule, ButtonsModule } from 'ngx-bootstrap';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameFormComponent } from './new-game-form/new-game-form.component';
import { EditGameFormComponent } from './edit-game-form/edit-game-form.component';
import { RemoveGameModalComponent } from './remove-game-modal/remove-game-modal.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    GameDetailComponent,
    CommaListPipe,
    NewGameFormComponent,
    EditGameFormComponent,
    RemoveGameModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CollectionRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  entryComponents: [
    RemoveGameModalComponent
  ]
})
export class CollectionModule { }
