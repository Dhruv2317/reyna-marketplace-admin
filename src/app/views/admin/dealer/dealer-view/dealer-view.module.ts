import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerViewRoutingModule } from './dealer-view-routing.module';
import { DealerViewComponent } from './dealer-view.component';


@NgModule({
  declarations: [
    DealerViewComponent
  ],
  imports: [
    CommonModule,
    DealerViewRoutingModule
  ]
})
export class DealerViewModule { }
