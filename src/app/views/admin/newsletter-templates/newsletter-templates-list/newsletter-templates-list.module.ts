import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsletterTemplatesListRoutingModule } from './newsletter-templates-list-routing.module';
import { NewsletterTemplatesListComponent } from './newsletter-templates-list.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    NewsletterTemplatesListComponent
  ],
  imports: [
    SharedModule,
    PipesModule,
    NewsletterTemplatesListRoutingModule
  ]
})
export class NewsletterTemplatesListModule { }
