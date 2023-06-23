import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';

import { CreatePolicyRoutingModule } from './create-policy-routing.module';
import { CreatePolicyComponent } from './create-policy.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreatePolicyComponent],
  imports: [
    SharedModule,
    CreatePolicyRoutingModule,
    NgxEditorModule
  ]
})
export class CreatePolicyModule { }
