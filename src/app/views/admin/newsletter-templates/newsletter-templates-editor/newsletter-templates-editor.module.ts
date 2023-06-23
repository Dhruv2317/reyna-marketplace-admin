import { NgModule } from '@angular/core';
import { NewsletterTemplatesEditorRoutingModule } from './newsletter-templates-editor-routing.module';
import { NewsletterTemplatesEditorComponent } from './newsletter-templates-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { NewsletterTemplatePreviewModule } from '../newsletter-template-preview/newsletter-template-preview.module';
import { NewsletterTemplatePreviewService } from '../newsletter-template-preview/newsletter-template-preview.service';


@NgModule({
  declarations: [
    NewsletterTemplatesEditorComponent
  ],
  imports: [
    SharedModule,
    NewsletterTemplatePreviewModule,
    NewsletterTemplatesEditorRoutingModule,
    NgxEditorModule
  ],
  providers:[NewsletterTemplatePreviewService]
})
export class NewsletterTemplatesEditorModule { }
