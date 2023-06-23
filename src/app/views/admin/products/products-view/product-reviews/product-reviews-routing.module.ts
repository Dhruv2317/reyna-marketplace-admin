import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductReviewsComponent } from './product-reviews.component';

const routes: Routes = [
  {path:'',component:ProductReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReviewsRoutingModule { }
