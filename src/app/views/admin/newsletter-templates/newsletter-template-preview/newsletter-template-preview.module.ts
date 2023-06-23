import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsletterTemplatePreviewComponent } from './newsletter-template-preview.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NewsletterTemplatePreviewService } from './newsletter-template-preview.service';



@NgModule({
  declarations: [
    NewsletterTemplatePreviewComponent
  ],
  imports: [
    SharedModule,
    PipesModule
  ],
  providers:[NewsletterTemplatePreviewService]
})
export class NewsletterTemplatePreviewModule { }
