import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCustomerRoutingModule } from './view-customer-routing.module';
import { ViewCustomerComponent } from './view-customer.component';
import { ViewCustomerService } from './view-customer.service';

 
@NgModule({
  declarations: [ViewCustomerComponent],
  imports: [
    SharedModule,
    ViewCustomerRoutingModule,
  ],
  providers: [ViewCustomerService]
})
export class ViewCustomerModule { }
