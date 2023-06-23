import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountVerifyModalComponent } from './account-verify-modal.component';
import { AccountVerifyModalService } from './account-verify-modal.service';

@NgModule({
  declarations: [
    AccountVerifyModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[AccountVerifyModalService],
  exports: [AccountVerifyModalComponent]
})
export class AccountVerifyModalModule { }
