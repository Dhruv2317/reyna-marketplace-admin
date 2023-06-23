import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SellerComponent } from './seller.component';

const routes: Routes = [
  {
    path: '', component: SellerComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=>import('./seller-list/seller-list.module').then(LS=>LS.SellerListModule) },
      { path: 'view/:id', loadChildren:()=>import('./seller-view/seller-view.module').then(VS=>VS.SellerViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
