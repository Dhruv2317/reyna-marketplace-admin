import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChangePasswordModalComponent } from './change-password-modal.component';
// import { ChangePasswordModalService } from './change-password-modal.service';
import { Helper } from 'src/app/services/helper.service';

@NgModule({
  declarations: [
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ChangePasswordModalComponent],
  providers:[Helper]
})
export class ChangePasswordModalModule { }
