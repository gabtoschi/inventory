import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameFormComponent } from './new-game-form/new-game-form.component';

const collectionRoutes : Routes = [
  {path: '', component: CollectionComponent, children: [
    {path: 'new', component: NewGameFormComponent},
    {path: 'view/:slug', component: GameDetailComponent}    
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
