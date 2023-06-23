import { NgModule } from '@angular/core';
import { PolicyListRoutingModule } from './policy-list-routing.module';
import { PolicyListComponent } from './policy-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PolicyListComponent],
  imports: [
    SharedModule,
    PolicyListRoutingModule
  ]
})
export class PolicyListModule { }
