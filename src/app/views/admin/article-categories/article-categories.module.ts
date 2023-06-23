import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleCategoriesRoutingModule } from './article-categories-routing.module';
import { ArticleCategoriesComponent } from './article-categories.component';


@NgModule({
  declarations: [
    ArticleCategoriesComponent
  ],
  imports: [
    CommonModule,
    ArticleCategoriesRoutingModule
  ]
})
export class ArticleCategoriesModule { }
