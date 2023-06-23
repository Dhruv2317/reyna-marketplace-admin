import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditCustomerRoutingModule } from './edit-customer-routing.module';
import { EditCustomerComponent } from './edit-customer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [EditCustomerComponent],
  imports: [
    SharedModule,
    EditCustomerRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EditCustomerModule { }
