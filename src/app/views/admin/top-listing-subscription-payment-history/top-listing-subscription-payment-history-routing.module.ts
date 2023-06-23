import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopListingSubscriptionPaymentHistoryComponent } from './top-listing-subscription-payment-history.component';

const routes: Routes = [
  {
    path:'',component:TopListingSubscriptionPaymentHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopListingSubscriptionPaymentHistoryRoutingModule { }
