import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommaListPipe } from './../shared/pipes/comma-list.pipe';
import { ArrayDifferencePipe } from './../shared/pipes/array-difference.pipe';

import { AlertModule, ModalModule, ButtonsModule, PaginationModule } from 'ngx-bootstrap';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameFormComponent } from './new-game-form/new-game-form.component';
import { EditGameFormComponent } from './edit-game-form/edit-game-form.component';
import { RemoveGameModalComponent } from './remove-game-modal/remove-game-modal.component';
import { CollectionPagerComponent } from './collection-list/collection-pager/collection-pager.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    GameDetailComponent,
    CommaListPipe,
    ArrayDifferencePipe,
    NewGameFormComponent,
    EditGameFormComponent,
    RemoveGameModalComponent,
    CollectionPagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CollectionRoutingModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  entryComponents: [
    RemoveGameModalComponent
  ]
})
export class CollectionModule { }
