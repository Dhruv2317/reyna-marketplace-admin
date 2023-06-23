import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleCategoriesViewRoutingModule } from './article-categories-view-routing.module';
import { ArticleCategoriesViewComponent } from './article-categories-view.component';


@NgModule({
  declarations: [
    ArticleCategoriesViewComponent
  ],
  imports: [
   CommonModule,
    ArticleCategoriesViewRoutingModule
  ]
})
export class ArticleCategoriesViewModule { }
