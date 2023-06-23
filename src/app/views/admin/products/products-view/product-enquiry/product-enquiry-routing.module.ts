import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEnquiryComponent } from './product-enquiry.component';

const routes: Routes = [
  {
    path:'',component:ProductEnquiryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductEnquiryRoutingModule { }
