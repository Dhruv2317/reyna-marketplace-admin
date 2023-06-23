import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersViewComponent } from './orders-view.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: OrdersViewComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersViewRoutingModule { }
