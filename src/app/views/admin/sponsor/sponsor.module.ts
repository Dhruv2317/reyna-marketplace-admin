import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorComponent } from './sponsor.component';


@NgModule({
  declarations: [
    SponsorComponent
  ],
  imports: [
    CommonModule,
    SponsorRoutingModule
  ]
})
export class SponsorModule { }
