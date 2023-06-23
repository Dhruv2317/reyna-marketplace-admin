import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProductsViewComponent } from './products-view.component';

const routes: Routes = [
  {
    path: '', component: ProductsViewComponent , canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren:()=>import('./product-info/product-info.module').then(productInfo=>productInfo.ProductInfoModule) },
      { path: 'orders', loadChildren:()=>import('../../orders/orders-list/orders-list.module').then(VD=>VD.OrdersListModule) },
      { path: 'reviews', loadChildren:()=>import('./product-reviews/product-reviews.module').then(productReviews=>productReviews.ProductReviewsModule) },
      { path: 'enquiry', loadChildren:()=>import('./product-enquiry/product-enquiry.module').then(productEnquiry=>productEnquiry.ProductEnquiryModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsViewRoutingModule { }
