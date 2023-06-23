import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import {  AttributeValuesRoutingModule } from './attribute-values-routing.module';
import { AttributeValuesComponent } from './attribute-values.component';
import { ValuesAddEditModalComponent } from '../values-add-edit-modal/values-add-edit-modal.component';
import { ValuesAddEditModalModule } from '../values-add-edit-modal/values-add-edit-modal.module';

@NgModule({
    declarations: [AttributeValuesComponent],
    imports: [
        SharedModule,
        ValuesAddEditModalModule,
        AttributeValuesRoutingModule
    ]
})
export class  AttributeValuesModule { }
