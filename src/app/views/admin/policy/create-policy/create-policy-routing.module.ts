import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePolicyComponent } from './create-policy.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: CreatePolicyComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePolicyRoutingModule { }
