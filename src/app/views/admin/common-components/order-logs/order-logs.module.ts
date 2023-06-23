import { NgModule } from '@angular/core';
import { OrderLogsComponent } from './order-logs.component';
import { OrderLogDetailsModalModule } from '../order-log-details-modal/order-log-details-modal.module';
import { OrderLogDetailsModalComponent } from '../order-log-details-modal/order-log-details-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrderLogsComponent],
  imports: [
    SharedModule,
    OrderLogDetailsModalModule
  ],
  exports: [OrderLogsComponent],
  entryComponents:[OrderLogDetailsModalComponent]
})
export class OrderLogsModule { }
