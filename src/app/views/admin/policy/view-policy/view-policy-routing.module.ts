import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPolicyComponent } from './view-policy.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ViewPolicyComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPolicyRoutingModule { }
