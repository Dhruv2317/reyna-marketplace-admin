import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AttributesListRoutingModule } from './attributes-list-routing.module';
import { AttributesListComponent } from './attributes-list.component';

import { AttributesAddEditModalComponent } from '../attributes-add-edit-modal/attributes-add-edit-modal.component';
import { AttributesAddEditModalModule } from '../attributes-add-edit-modal/attributes-add-edit-modal.module';

@NgModule({
    declarations: [
        AttributesListComponent
    ],
    imports: [
        SharedModule,
        AttributesAddEditModalModule,
        AttributesListRoutingModule
    ]
})
export class AttributesListModule { }
