import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SponsorListRoutingModule } from './sponsor-list-routing.module';
import { SponsorListComponent } from './sponsor-list.component';

import { SponsorAddEditModalComponent } from '../sponsor-add-edit-modal/sponsor-add-edit-modal.component';
import { SponsorAddEditModalModule } from '../sponsor-add-edit-modal/sponsor-add-edit-modal.module';

@NgModule({
    declarations: [
        SponsorListComponent
    ],
    imports: [
        SharedModule,
        SponsorAddEditModalModule,
        SponsorListRoutingModule
    ]
})
export class SponsorListModule { }
