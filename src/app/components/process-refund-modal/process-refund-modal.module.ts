import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessRefundModalComponent } from './process-refund-modal.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ProcessRefundModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class ProcessRefundModalModule { }
