import { NgModule } from '@angular/core';
import { RefundRequestedOrdersComponent } from './refund-requested-orders.component';
import {RefundRequestedOrdersRoutingModule} from './refund-requested-orders-routing.module';
import {orderHelper} from 'src/app/services/orderHelper.service';
import { ProcessRefundModalModule } from 'src/app/components/process-refund-modal/process-refund-modal.module';
import { ProcessRefundModalComponent } from 'src/app/components/process-refund-modal/process-refund-modal.component';
import { ProcessRefundModalService } from 'src/app/components/process-refund-modal/process-refund-modal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [RefundRequestedOrdersComponent],
    imports: [
        RefundRequestedOrdersRoutingModule,
        SharedModule,
        ProcessRefundModalModule
    ],
    providers: [orderHelper, ProcessRefundModalService]
})
export class RefundRequestedOrdersModule { }
