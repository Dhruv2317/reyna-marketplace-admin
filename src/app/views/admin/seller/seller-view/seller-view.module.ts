import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerViewRoutingModule } from './seller-view-routing.module';
import { SellerViewComponent } from './seller-view.component';


@NgModule({
  declarations: [
    SellerViewComponent
  ],
  imports: [
    CommonModule,
    SellerViewRoutingModule
  ]
})
export class SellerViewModule { }
