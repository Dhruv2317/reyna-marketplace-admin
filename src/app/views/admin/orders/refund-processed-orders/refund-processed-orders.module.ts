import { NgModule } from '@angular/core';
import { RefundProcessedOrdersComponent } from './refund-processed-orders.component';
import {RefundProcessedOrdersRoutingModule} from './refund-processed-orders-routing.module';
import {orderHelper} from 'src/app/services/orderHelper.service';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [RefundProcessedOrdersComponent],
  imports: [
    RefundProcessedOrdersRoutingModule,
    SharedModule
  ],
  providers:[orderHelper]
})
export class RefundProcessedOrdersModule { }
