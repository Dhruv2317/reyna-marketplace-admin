import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PlansListRoutingModule } from './plans-list-routing.module';
import { PlansListComponent } from './plans-list.component';

import { PlansAddEditModalComponent } from '../plans-add-edit-modal/plans-add-edit-modal.component';
import { PlansAddEditModalModule } from '../plans-add-edit-modal/plans-add-edit-modal.module';

@NgModule({
    declarations: [
        PlansListComponent
    ],
    imports: [
        SharedModule,
        PlansAddEditModalModule,
        PlansListRoutingModule
    ]
})
export class PlansListModule { }
