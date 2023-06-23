import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoBrandComponent } from './info-brand.component';
import { InfoBrandRoutingModule } from './info-brand-routing.module';

@NgModule({
  declarations: [
    InfoBrandComponent
  ],
  imports: [
    CommonModule,
    InfoBrandRoutingModule
  ]
})
export class InfoBrandModule { }
