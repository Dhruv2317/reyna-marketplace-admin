import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqListComponent } from './faq-list.component';
import { AuthGuard } from '../../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: FaqListComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqListRoutingModule { }
