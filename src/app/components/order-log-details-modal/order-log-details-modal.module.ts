import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderLogDetailsModalComponent } from './order-log-details-modal.component';
import { OrderLogDetailsModalService } from './order-subscription-modal.service';

@NgModule({
  declarations: [OrderLogDetailsModalComponent],
  imports: [
    CommonModule
  ],
  providers:[OrderLogDetailsModalService],
  exports:[OrderLogDetailsModalComponent]
})
export class OrderLogDetailsModalModule { }
