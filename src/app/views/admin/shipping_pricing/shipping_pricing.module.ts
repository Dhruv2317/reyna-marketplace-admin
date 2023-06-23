import { NgModule } from '@angular/core';
import { ShippingPricingRoutingModule } from './shipping_pricing-routing.module';
import { ShippingPricingComponent } from './shipping_pricing.component';
import {ShippingPricingService} from './shipping_pricing.service'
import { ShippingPricingAddEditModalModule } from './shipping_pricing-add-edit-modal/shipping_pricing-add-edit-modal.module';
import { ShippingPricingAddEditModalService } from './shipping_pricing-add-edit-modal/shipping_pricing-add-edit-modal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ShippingPricingComponent],
    imports: [
        SharedModule,
        ShippingPricingRoutingModule,
        ShippingPricingAddEditModalModule
    ],
    providers: [ShippingPricingService, ShippingPricingAddEditModalService]
})
export class ShippingPricingModule { }
