import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
