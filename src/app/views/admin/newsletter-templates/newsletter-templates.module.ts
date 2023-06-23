import { NgModule } from '@angular/core';
import { NewsletterTemplatesRoutingModule } from './newsletter-templates-routing.module';
import { NewsletterTemplatesComponent } from './newsletter-templates.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NewsletterTemplatesComponent
  ],
  imports: [
    SharedModule,
    NewsletterTemplatesRoutingModule
  ]
})
export class NewsletterTemplatesModule { }
