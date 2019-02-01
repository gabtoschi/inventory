import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collection-routing.module';

@NgModule({
  declarations: [
    CollectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollectionRoutingModule
  ]
})
export class CollectionModule { }
