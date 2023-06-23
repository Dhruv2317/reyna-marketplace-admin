import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesViewRoutingModule } from './categories-view-routing.module';
import { CategoriesViewComponent } from './categories-view.component';


@NgModule({
  declarations: [
    CategoriesViewComponent
  ],
  imports: [
   CommonModule,
    CategoriesViewRoutingModule
  ]
})
export class CategoriesViewModule { }
