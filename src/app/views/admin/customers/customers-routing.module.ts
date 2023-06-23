import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: CustomersComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=>import('./list-customer/list-customer.module').then(LC=>LC.ListCustomerModule) },
      { path: 'edit/:id', loadChildren:()=>import('./edit-customer/edit-customer.module').then(EC=>EC.EditCustomerModule) },
      { path: 'view/:id', loadChildren:()=>import('./view-customer/view-customer.module').then(VC=>VC.ViewCustomerModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
