import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerViewComponent } from './dealer-view.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: DealerViewComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren:()=>import('./dealer-info/dealer-info.module').then(ID=>ID.DealerInfoModule) },
      { path: 'login-history', loadChildren:()=>import('./login-history-devices/login-history-devices.module').then(loginHistory=>loginHistory.LoginHistoryDevicesModule) },
      { path: 'subscription-payment-history', loadChildren:()=>import('./subscription-payment-history/subscription-payment-history.module').then(VD=>VD.SubscriptionPaymentHistoryModule)},
      { path: 'products', loadChildren:()=>import('../../products/products-list/products-list.module').then(VD=>VD.ProductsListModule) },
      { path: 'orders', loadChildren:()=>import('../../orders/orders-list/orders-list.module').then(VD=>VD.OrdersListModule) },
      { path:'order-history',loadChildren:()=>import('../../orders/orders-list/orders-list.module').then(VD=>VD.OrdersListModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerViewRoutingModule { }
