import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';

import { EditFaqRoutingModule } from './edit-faq-routing.module';
import { EditFaqComponent } from './edit-faq.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditFaqComponent],
  imports: [
    SharedModule,
    EditFaqRoutingModule,
    NgxEditorModule
  ]
})
export class EditFaqModule { }
