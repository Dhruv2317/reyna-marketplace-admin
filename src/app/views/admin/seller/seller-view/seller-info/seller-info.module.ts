import { NgModule } from '@angular/core';
import { SellerInfoRoutingModule } from './seller-info-routing.module';
import { SellerInfoComponent } from './seller-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImagePreviewModule } from 'src/app/shared/image-preview/image-preview.module';
import { AccountVerifyModalModule } from 'src/app/components/account-verify-modal/account-verify-modal.module';


@NgModule({
  declarations: [
    SellerInfoComponent
  ],
  imports: [
    SharedModule,
    ImagePreviewModule,
    AccountVerifyModalModule,
    SellerInfoRoutingModule
  ]
})
export class SellerInfoModule { }
