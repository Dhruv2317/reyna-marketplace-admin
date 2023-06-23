import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesListRoutingModule } from './categories-list-routing.module';
import { CategoriesListComponent } from './categories-list.component';

import { CategoriesAddEditModalComponent } from '../categories-add-edit-modal/categories-add-edit-modal.component';
import { CategoriesAddEditModalModule } from '../categories-add-edit-modal/categories-add-edit-modal.module';

@NgModule({
    declarations: [
        CategoriesListComponent
    ],
    imports: [
        SharedModule,
        CategoriesAddEditModalModule,
        CategoriesListRoutingModule
    ]
})
export class CategoriesListModule { }
