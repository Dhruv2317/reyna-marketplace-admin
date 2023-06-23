import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesViewRoutingModule } from './attributes-view-routing.module';
import { AttributesViewComponent } from './attributes-view.component';


@NgModule({
  declarations: [
    AttributesViewComponent
  ],
  imports: [
   CommonModule,
    AttributesViewRoutingModule
  ]
})
export class AttributesViewModule { }
