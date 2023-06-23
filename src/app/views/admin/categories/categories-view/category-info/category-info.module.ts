import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoryInfoRoutingModule } from './category-info-routing.module';
import { CategoryInfoComponent } from './category-info.component';
import {ImagePreviewModule} from 'src/app/shared/image-preview/image-preview.module';
import { CategoriesAddEditModalComponent } from '../../categories-add-edit-modal/categories-add-edit-modal.component';
import { CategoriesAddEditModalModule } from '../../categories-add-edit-modal/categories-add-edit-modal.module';

@NgModule({
    declarations: [CategoryInfoComponent],
    imports: [
        SharedModule,
        CategoryInfoRoutingModule,
        ImagePreviewModule,
        CategoriesAddEditModalModule
    ]
})
export class CategoryInfoModule { }
