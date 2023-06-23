import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFaqComponent } from './view-faq.component';
import { AuthGuard } from '../../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ViewFaqComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewFaqRoutingModule { }
