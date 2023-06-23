import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewFaqRoutingModule } from './view-faq-routing.module';
import { ViewFaqComponent } from './view-faq.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewFaqComponent],
  imports: [
    CommonModule,
    ViewFaqRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ViewFaqModule { }
