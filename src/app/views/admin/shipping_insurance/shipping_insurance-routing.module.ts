import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingInsuranceComponent } from './shipping_insurance.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
     path: '', component: ShippingInsuranceComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingInsuranceRoutingModule { }
