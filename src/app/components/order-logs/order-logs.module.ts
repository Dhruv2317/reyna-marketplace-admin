import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderLogsComponent } from './order-logs.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { OrderLogDetailsModalModule } from '../order-log-details-modal/order-log-details-modal.module';
import { OrderLogDetailsModalComponent } from '../order-log-details-modal/order-log-details-modal.component';

@NgModule({
    declarations: [OrderLogsComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        ModalModule.forRoot(),
        OrderLogDetailsModalModule
    ],
    exports: [OrderLogsComponent]
})
export class OrderLogsModule { }
