import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { NewsletterSubscribersRoutingModule } from './newsletter-subscribers-routing.module';
import { NewsletterSubscribersComponent } from './newsletter-subscribers.component';


@NgModule({
  declarations: [
    NewsletterSubscribersComponent
  ],
  imports: [
    SharedModule,
    NewsletterSubscribersRoutingModule
  ]
})
export class NewsletterSubscribersModule { }
