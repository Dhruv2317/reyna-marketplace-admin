import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingPricingComponent } from './shipping_pricing.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
     path: '', component: ShippingPricingComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingPricingRoutingModule { }
