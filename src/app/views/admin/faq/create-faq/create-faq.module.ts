import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';

import { CreateFaqRoutingModule } from './create-faq-routing.module';
import { CreateFaqComponent } from './create-faq.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateFaqComponent],
  imports: [
    SharedModule,
    CreateFaqRoutingModule,
    NgxEditorModule
  ]
})
export class CreateFaqModule { }
