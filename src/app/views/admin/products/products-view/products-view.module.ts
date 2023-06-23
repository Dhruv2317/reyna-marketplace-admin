import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsViewRoutingModule } from './products-view-routing.module';
import { ProductsViewComponent } from './products-view.component';


@NgModule({
  declarations: [
    ProductsViewComponent
  ],
  imports: [
    CommonModule,
    ProductsViewRoutingModule
  ]
})
export class ProductsViewModule { }
