import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    OrdersRoutingModule,
    CommonModule
  ]
})
export class OrdersModule { }
