import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValuesAddEditModalComponent } from './values-add-edit-modal.component';
import { ValuesAddEditModalService } from './values-add-edit-modal.service';

@NgModule({
  declarations:[
    ValuesAddEditModalComponent
  ],
  imports:[
    SharedModule
  ],
  providers:[ValuesAddEditModalService],
  exports: [ValuesAddEditModalComponent]
})
export class ValuesAddEditModalModule { }
