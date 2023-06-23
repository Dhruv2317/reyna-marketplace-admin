import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleCategoriesListComponent } from './article-categories-list.component';

const routes: Routes = [
  { path: '', component: ArticleCategoriesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCategoriesListRoutingModule { }
