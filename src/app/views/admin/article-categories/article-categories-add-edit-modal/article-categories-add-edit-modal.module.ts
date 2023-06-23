import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleCategoriesAddEditModalComponent } from './article-categories-add-edit-modal.component';
import { ArticleCategoriesAddEditModalService } from './article-categories-add-edit-modal.service';

@NgModule({
  declarations: [
    ArticleCategoriesAddEditModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[ArticleCategoriesAddEditModalService],
  exports: [ArticleCategoriesAddEditModalComponent]
})
export class ArticleCategoriesAddEditModalModule { }
