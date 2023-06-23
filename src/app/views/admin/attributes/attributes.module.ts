import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';
import { AttributesComponent } from './attributes.component';


@NgModule({
  declarations: [
    AttributesComponent
  ],
  imports: [
    CommonModule,
    AttributesRoutingModule
  ]
})
export class AttributesModule { }
