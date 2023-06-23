import { NgModule } from '@angular/core';
import { OrdersListRoutingModule } from './orders-list-routing.module';
import { OrdersListComponent } from './orders-list.component';
import { orderHelper } from 'src/app/services/orderHelper.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    SharedModule,
    OrdersListRoutingModule
  ],
  providers:[orderHelper]
})
export class OrdersListModule { }
