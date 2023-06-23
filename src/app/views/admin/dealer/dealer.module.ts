import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerRoutingModule } from './dealer-routing.module';
import { DealerComponent } from './dealer.component';


@NgModule({
  declarations: [
    DealerComponent
  ],
  imports: [
    CommonModule,
    DealerRoutingModule
  ]
})
export class DealerModule { }
