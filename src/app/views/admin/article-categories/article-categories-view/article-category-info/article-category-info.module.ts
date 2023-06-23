import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleCategoryInfoRoutingModule } from './article-category-info-routing.module';
import { ArticleCategoryInfoComponent } from './article-category-info.component';
import {ImagePreviewModule} from 'src/app/shared/image-preview/image-preview.module';
import { ChangeSequenceModule } from 'src/app/shared/change-sequence/change-sequence.module';
import { ArticleCategoriesAddEditModalComponent } from '../../article-categories-add-edit-modal/article-categories-add-edit-modal.component';
import { ArticleCategoriesAddEditModalModule } from '../../article-categories-add-edit-modal/article-categories-add-edit-modal.module';

@NgModule({
    declarations: [ArticleCategoryInfoComponent],
    imports: [
        SharedModule,
        ArticleCategoryInfoRoutingModule,
        ImagePreviewModule,
        ChangeSequenceModule,
        ArticleCategoriesAddEditModalModule
    ]
})
export class ArticleCategoryInfoModule { }
