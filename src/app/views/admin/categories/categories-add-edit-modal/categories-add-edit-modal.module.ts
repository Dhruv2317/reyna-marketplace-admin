import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesAddEditModalComponent } from './categories-add-edit-modal.component';
import { CategoriesAddEditModalService } from './categories-add-edit-modal.service';

@NgModule({
  declarations: [
    CategoriesAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[CategoriesAddEditModalService],
  exports: [CategoriesAddEditModalComponent]
})
export class CategoriesAddEditModalModule { }
