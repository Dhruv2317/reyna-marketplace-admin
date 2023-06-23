import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PlansComponent } from './plans.component';

const routes: Routes = [
  {
    path: '', component: PlansComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', loadChildren:()=>import('./plans-list/plans-list.module').then(List=>List.PlansListModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
