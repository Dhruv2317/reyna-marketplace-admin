import { NgModule } from '@angular/core';
import { OrdersViewRoutingModule } from './orders-view-routing.module';
import { OrdersViewComponent } from './orders-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import { orderHelper } from 'src/app/services/orderHelper.service';
import { OrderLogsModule } from '../../../../components/order-logs/order-logs.module';
import { ImagePreviewModule } from '../../../../shared/image-preview/image-preview.module';
import { RefundDrugModalModule } from '../../common-components/refund-drug-modal/refund-drug-modal.module';
import { RefundDrugModalComponent } from '../../common-components/refund-drug-modal/refund-drug-modal.component';
import { CustomImageCropperModule } from 'src/app/components/custom-image-cropper/custom-image-cropper.module';
import { CustomImageCropperComponent } from 'src/app/components/custom-image-cropper/custom-image-cropper.component';
import { CustomImageCropperService } from 'src/app/components/custom-image-cropper/custom-image-cropper.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [OrdersViewComponent],
    imports: [
        SharedModule,
        OrdersViewRoutingModule,
        MatTabsModule,
        RefundDrugModalModule,
        OrderLogsModule,
        ImagePreviewModule,
        CustomImageCropperModule
    ],
    providers: [orderHelper, CustomImageCropperService]
})
export class OrdersViewModule { }
