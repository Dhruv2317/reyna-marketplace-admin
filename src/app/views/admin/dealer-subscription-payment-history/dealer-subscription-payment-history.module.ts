import { NgModule } from '@angular/core';
import { DealerSubscriptionPaymentHistoryRoutingModule } from './dealer-subscription-payment-history-routing.module';
import { DealerSubscriptionPaymentHistoryComponent } from './dealer-subscription-payment-history.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DealerSubscriptionPaymentHistoryComponent
  ],
  imports: [
    SharedModule,
    DealerSubscriptionPaymentHistoryRoutingModule
  ]
})
export class DealerSubscriptionPaymentHistoryModule { }
