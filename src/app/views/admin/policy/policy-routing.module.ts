import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PolicyComponent } from './policy.component';

const routes: Routes = [
  {
    path: '', component: PolicyComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=>import('./policy-list/policy-list.module').then(FL=>FL.PolicyListModule) },
      { path: 'create', loadChildren:()=>import('./create-policy/create-policy.module').then(FC=>FC.CreatePolicyModule) },
      { path: 'edit/:id', loadChildren:()=>import('./create-policy/create-policy.module').then(FE=>FE.CreatePolicyModule) },
      { path: 'view/:id', loadChildren:()=>import('./view-policy/view-policy.module').then(FV=>FV.ViewPolicyModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
