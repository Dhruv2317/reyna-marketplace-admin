import { NgModule } from '@angular/core';
import { PlansAddEditModalComponent } from './plans-add-edit-modal.component';
import { PlansAddEditModalService } from './plans-add-edit-modal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PlansAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[PlansAddEditModalService],
  exports: [PlansAddEditModalComponent]
})
export class PlansAddEditModalModule { }
