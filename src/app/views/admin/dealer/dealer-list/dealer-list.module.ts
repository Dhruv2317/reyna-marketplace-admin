import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { DealerListRoutingModule } from './dealer-list-routing.module';
import { DealerListComponent } from './dealer-list.component';


@NgModule({
  declarations: [
    DealerListComponent
  ],
  imports: [
    SharedModule,
    DealerListRoutingModule
  ]
})
export class DealerListModule { }
