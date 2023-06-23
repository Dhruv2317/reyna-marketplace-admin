import { NgModule } from '@angular/core';
import { SubscriptionPaymentHistoryRoutingModule } from './subscription-payment-history-routing.module';
import { SubscriptionPaymentHistoryComponent } from './subscription-payment-history.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SubscriptionPaymentHistoryComponent
  ],
  imports: [
    SharedModule,
    SubscriptionPaymentHistoryRoutingModule
  ]
})
export class SubscriptionPaymentHistoryModule { }
