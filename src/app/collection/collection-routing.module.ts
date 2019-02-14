import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewGameFormComponent } from './new-game-form/new-game-form.component';
import { EditGameFormComponent } from './edit-game-form/edit-game-form.component';

import { GameListResolveGuard } from './guards/game-list-resolve.guard';
import { GameDataResolveGuard } from './guards/game-data-resolve.guard';

const collectionRoutes: Routes = [
  {path: '', component: CollectionComponent, resolve: {gamelist: GameListResolveGuard},
      children: [
    {path: 'new', component: NewGameFormComponent},
    {path: ':slug/view', component: GameDetailComponent, resolve: {gamedata: GameDataResolveGuard}},
    {path: ':slug/edit', component: EditGameFormComponent, resolve: {gamedata: GameDataResolveGuard}}
  ]}
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
