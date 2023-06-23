import { NgModule } from '@angular/core';
import { ShippingInsuranceRoutingModule } from './shipping_insurance-routing.module';
import { ShippingInsuranceComponent } from './shipping_insurance.component';
import {ShippingInsuranceService} from './shipping_insurance.service'
import { ShippingInsuranceAddEditModalModule } from './shipping_insurance-add-edit-modal/shipping_insurance-add-edit-modal.module';
import { ShippingInsuranceAddEditModalService } from './shipping_insurance-add-edit-modal/shipping_insurance-add-edit-modal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ShippingInsuranceComponent],
    imports: [
        SharedModule,
        ShippingInsuranceRoutingModule,
        ShippingInsuranceAddEditModalModule
    ],
    providers: [ShippingInsuranceService, ShippingInsuranceAddEditModalService]
})
export class ShippingInsuranceModule { }
