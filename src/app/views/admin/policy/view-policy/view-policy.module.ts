import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPolicyRoutingModule } from './view-policy-routing.module';
import { ViewPolicyComponent } from './view-policy.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewPolicyComponent],
  imports: [
    CommonModule,
    ViewPolicyRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ViewPolicyModule { }
