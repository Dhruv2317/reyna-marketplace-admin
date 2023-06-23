import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCategoryInfoComponent } from './article-category-info.component';

const routes: Routes = [
  {
    path:'',component:ArticleCategoryInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCategoryInfoRoutingModule { }
