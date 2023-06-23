import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategorySubcategoriesRoutingModule } from './category-subcategories-routing.module';
import { CategorySubcategoriesComponent } from './category-subcategories.component';

import { SubcategoriesAddEditModalComponent } from '../subcategories-add-edit-modal/subcategories-add-edit-modal.component';
import { SubcategoriesAddEditModalModule } from '../subcategories-add-edit-modal/subcategories-add-edit-modal.module';

@NgModule({
    declarations: [CategorySubcategoriesComponent],
    imports: [
        SharedModule,
        SubcategoriesAddEditModalModule,
        CategorySubcategoriesRoutingModule
    ]
})
export class CategorySubcategoriesModule { }
