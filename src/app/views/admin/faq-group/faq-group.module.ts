import { NgModule } from '@angular/core';
import { FAQGroupRoutingModule } from './faq-group-routing.module';
import { FAQGroupComponent } from './faq-group.component';
import {FAQGroupService} from './faq-group.service'

import { FAQGroupAddEditModalComponent } from './faq-group-add-edit-modal/faq-group-add-edit-modal.component';
import { FAQGroupAddEditModalModule } from './faq-group-add-edit-modal/faq-group-add-edit-modal.module';
import { FAQGroupAddEditModalService } from './faq-group-add-edit-modal/faq-group-add-edit-modal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [FAQGroupComponent],
    imports: [
        SharedModule,
        FAQGroupRoutingModule,
        FAQGroupAddEditModalModule
    ],
    providers: [FAQGroupService, FAQGroupAddEditModalService]
})
export class FAQGroupModule { }
