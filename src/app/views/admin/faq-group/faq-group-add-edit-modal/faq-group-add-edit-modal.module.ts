import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FAQGroupAddEditModalComponent } from './faq-group-add-edit-modal.component';
import { FAQGroupAddEditModalService } from './faq-group-add-edit-modal.service';

@NgModule({
  declarations: [
    FAQGroupAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[FAQGroupAddEditModalService],
  exports: [FAQGroupAddEditModalComponent]
})
export class FAQGroupAddEditModalModule { }
