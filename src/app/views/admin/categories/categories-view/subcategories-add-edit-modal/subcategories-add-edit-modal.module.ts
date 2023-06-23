import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubcategoriesAddEditModalComponent } from './subcategories-add-edit-modal.component';
import { SubcategoriesAddEditModalService } from './subcategories-add-edit-modal.service';

@NgModule({
  declarations: [
    SubcategoriesAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[SubcategoriesAddEditModalService],
  exports: [SubcategoriesAddEditModalComponent]
})
export class SubcategoriesAddEditModalModule { }
