import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { BrandListRoutingModule } from './brand-list-routing.module';
import { BrandListComponent } from './brand-list.component';

import { BrandAddEditModalComponent } from '../brand-add-edit-modal/brand-add-edit-modal.component';
import { BrandAddEditModalModule } from '../brand-add-edit-modal/brand-add-edit-modal.module';

@NgModule({
    declarations: [
        BrandListComponent
    ],
    imports: [
        SharedModule,
        BrandAddEditModalModule,
        BrandListRoutingModule
    ]
})
export class BrandListModule { }
