import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ShippingPricingAddEditModalComponent } from './shipping_pricing-add-edit-modal.component';
import { ShippingPricingAddEditModalService } from './shipping_pricing-add-edit-modal.service';

@NgModule({
  declarations: [
    ShippingPricingAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[ShippingPricingAddEditModalService],
  exports: [ShippingPricingAddEditModalComponent]
})
export class ShippingPricingAddEditModalModule { }
