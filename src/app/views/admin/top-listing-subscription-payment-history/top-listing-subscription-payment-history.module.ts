import { NgModule } from '@angular/core';

import { TopListingSubscriptionPaymentHistoryRoutingModule } from './top-listing-subscription-payment-history-routing.module';
import { TopListingSubscriptionPaymentHistoryComponent } from './top-listing-subscription-payment-history.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TopListingSubscriptionPaymentHistoryComponent
  ],
  imports: [
    SharedModule,
    TopListingSubscriptionPaymentHistoryRoutingModule
  ]
})
export class TopListingSubscriptionPaymentHistoryModule { }
