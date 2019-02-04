import { CommaListPipe } from './../shared/pipes/comma-list.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    GameDetailComponent,
    CommaListPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
