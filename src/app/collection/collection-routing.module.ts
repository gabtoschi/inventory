import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

const collectionRoutes : Routes = [
  {path: '', component: CollectionComponent, children: [
    {path: ':slug', component: GameDetailComponent}
  ]},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(collectionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CollectionRoutingModule { }
