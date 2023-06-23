import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundRequestedOrdersComponent } from './refund-requested-orders.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: RefundRequestedOrdersComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundRequestedOrdersRoutingModule { }
