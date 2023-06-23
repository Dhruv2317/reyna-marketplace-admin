import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';

@NgModule({
  declarations: [PolicyComponent],
  imports: [
    SharedModule,
    PolicyRoutingModule
  ]
})
export class PolicyModule { }
