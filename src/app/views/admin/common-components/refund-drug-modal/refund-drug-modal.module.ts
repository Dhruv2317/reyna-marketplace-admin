import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RefundDrugModalComponent } from './refund-drug-modal.component';
import { RefundDrugModalService } from './refund-drug-modal.service';

@NgModule({
  declarations: [
    RefundDrugModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[RefundDrugModalService],
  exports:[RefundDrugModalComponent]
})
export class RefundDrugModalModule { }
