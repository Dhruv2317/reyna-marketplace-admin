import { NgModule } from '@angular/core';
import { ListCustomerRoutingModule } from './list-customer-routing.module';
import { ListCustomerComponent } from './list-customer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListCustomerComponent],
  imports: [
    SharedModule,
    ListCustomerRoutingModule
  ]
})
export class ListCustomerModule { }
