import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ShippingInsuranceAddEditModalComponent } from './shipping_insurance-add-edit-modal.component';
import { ShippingInsuranceAddEditModalService } from './shipping_insurance-add-edit-modal.service';

@NgModule({
  declarations: [
    ShippingInsuranceAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[ShippingInsuranceAddEditModalService],
  exports: [ShippingInsuranceAddEditModalComponent]
})
export class ShippingInsuranceAddEditModalModule { }
