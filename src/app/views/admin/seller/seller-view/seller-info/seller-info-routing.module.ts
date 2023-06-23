import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerInfoComponent } from './seller-info.component';

const routes: Routes = [{
  path:'',component:SellerInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerInfoRoutingModule { }
