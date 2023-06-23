import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFaqComponent } from './create-faq.component';
import { AuthGuard } from '../../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: CreateFaqComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateFaqRoutingModule { }
