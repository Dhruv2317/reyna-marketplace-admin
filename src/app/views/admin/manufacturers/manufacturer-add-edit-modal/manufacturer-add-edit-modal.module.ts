import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManufacturerAddEditModalComponent } from './manufacturer-add-edit-modal.component';
import { ManufacturerAddEditModalService } from './manufacturer-add-edit-modal.service';

@NgModule({
  declarations: [
    ManufacturerAddEditModalComponent
  ],
  imports: [
    SharedModule,
  ],
  providers:[ManufacturerAddEditModalService],
  exports: [ManufacturerAddEditModalComponent]
})
export class ManufacturerAddEditModalModule { }
