import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AttributeInfoRoutingModule } from './attribute-info-routing.module';
import { AttributeInfoComponent } from './attribute-info.component';
import {ImagePreviewModule} from 'src/app/shared/image-preview/image-preview.module';
import { AttributesAddEditModalComponent } from '../../attributes-add-edit-modal/attributes-add-edit-modal.component';
import { AttributesAddEditModalModule } from '../../attributes-add-edit-modal/attributes-add-edit-modal.module';

@NgModule({
    declarations: [AttributeInfoComponent],
    imports: [
        SharedModule,
        AttributeInfoRoutingModule,
        ImagePreviewModule,
        AttributesAddEditModalModule
    ]
})
export class AttributeInfoModule { }
