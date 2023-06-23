import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorySubcategoriesComponent } from './category-subcategories.component';

const routes: Routes = [{
  path:'',component:CategorySubcategoriesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorySubcategoriesRoutingModule { }
