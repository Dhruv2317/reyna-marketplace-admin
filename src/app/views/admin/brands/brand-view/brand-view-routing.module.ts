import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { BrandViewComponent } from './brand-view.component';

const routes: Routes = [
  {
    path: '', component : BrandViewComponent, canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren:()=>import('./info-brand/info-brand.module').then(info => info.InfoBrandModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandViewRoutingModule { }
