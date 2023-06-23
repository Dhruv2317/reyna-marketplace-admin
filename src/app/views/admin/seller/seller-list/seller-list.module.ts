import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SellerListRoutingModule } from './seller-list-routing.module';
import { SellerListComponent } from './seller-list.component';


@NgModule({
  declarations: [
    SellerListComponent
  ],
  imports: [
    SharedModule,
    SellerListRoutingModule
  ]
})
export class SellerListModule { }
