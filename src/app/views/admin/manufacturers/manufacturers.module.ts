import { NgModule } from '@angular/core';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturersComponent } from './manufacturers.component';
import {ManufacturersService} from './manufacturers.service'

import { ManufacturerAddEditModalComponent } from './manufacturer-add-edit-modal/manufacturer-add-edit-modal.component';
import { ManufacturerAddEditModalModule } from './manufacturer-add-edit-modal/manufacturer-add-edit-modal.module';
import { ManufacturerAddEditModalService } from './manufacturer-add-edit-modal/manufacturer-add-edit-modal.service';
import { ModalModule,BsModalService } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ManufacturersComponent],
    imports: [
        SharedModule,
        ManufacturersRoutingModule,
        ModalModule.forRoot(),
        ManufacturerAddEditModalModule
    ],
    providers: [ManufacturersService, BsModalService, ManufacturerAddEditModalService]
})
export class ManufacturersModule { }
