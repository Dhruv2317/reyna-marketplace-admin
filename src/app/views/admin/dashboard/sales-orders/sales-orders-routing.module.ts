import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesOrdersComponent } from './sales-orders.component';

const routes: Routes = [
  {
    path: '', component: SalesOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrdersRoutingModule { }
