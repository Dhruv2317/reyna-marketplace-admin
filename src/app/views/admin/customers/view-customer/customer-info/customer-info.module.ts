import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CustomerInfoRoutingModule } from './customer-info-routing.module';
import { CustomerInfoComponent } from './customer-info.component';

import { ImagePreviewModule } from 'src/app/shared/image-preview/image-preview.module';

import { CustomImageCropperModule } from 'src/app/components/custom-image-cropper/custom-image-cropper.module';
import { CustomImageCropperComponent } from 'src/app/components/custom-image-cropper/custom-image-cropper.component';

import { ChangePasswordModalModule } from 'src/app/components/change-password-modal/change-password-modal.module';
import { ChangePasswordModalComponent } from 'src/app/components/change-password-modal/change-password-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        CustomerInfoComponent
    ],
    imports: [
        SharedModule,
        ImagePreviewModule,
        ModalModule.forRoot(),
        NgxMaskModule.forChild(),
        CustomImageCropperModule,
        ChangePasswordModalModule,
        CustomerInfoRoutingModule
    ]
})
export class CustomerInfoModule { }
