import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryInfoComponent } from './category-info.component';

const routes: Routes = [
  {
    path:'',component:CategoryInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryInfoRoutingModule { }
