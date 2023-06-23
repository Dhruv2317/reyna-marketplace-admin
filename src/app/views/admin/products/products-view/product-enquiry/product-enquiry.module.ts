import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductEnquiryRoutingModule } from './product-enquiry-routing.module';
import { ProductEnquiryComponent } from './product-enquiry.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductEnquiryComponent
  ],
  imports: [
    SharedModule,
    ProductEnquiryRoutingModule
  ]
})
export class ProductEnquiryModule { }
