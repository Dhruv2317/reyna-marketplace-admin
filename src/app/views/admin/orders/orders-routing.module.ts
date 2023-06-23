import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: OrdersComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=> import('./orders-list/orders-list.module').then(OL => OL.OrdersListModule) },
      { path: 'view/:id', loadChildren:()=> import('./orders-view/orders-view.module').then(OV => OV.OrdersViewModule) },
      { path: 'refund_processed', loadChildren:()=> import('./refund-processed-orders/refund-processed-orders.module').then(RP => RP.RefundProcessedOrdersModule) },
      { path: 'refund_requested', loadChildren:()=> import('./refund-requested-orders/refund-requested-orders.module').then(RO => RO.RefundRequestedOrdersModule) }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
