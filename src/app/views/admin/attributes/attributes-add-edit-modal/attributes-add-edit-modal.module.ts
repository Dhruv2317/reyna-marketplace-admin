import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AttributesAddEditModalComponent } from './attributes-add-edit-modal.component';
import { AttributesAddEditModalService } from './attributes-add-edit-modal.service';

@NgModule({
  declarations: [
    AttributesAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[AttributesAddEditModalService],
  exports: [AttributesAddEditModalComponent]
})
export class AttributesAddEditModalModule { }
