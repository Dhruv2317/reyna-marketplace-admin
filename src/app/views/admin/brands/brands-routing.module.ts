import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BrandsComponent } from './brands.component';

const routes: Routes = [
  {
    path: '', component: BrandsComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', loadChildren:()=>import('./brand-list/brand-list.module').then(BL=>BL.BrandListModule) },
        { path: 'view/:brand_id', loadChildren:()=>import('./brand-view/brand-view.module').then(BV=>BV.BrandViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
