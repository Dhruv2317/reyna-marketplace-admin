import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditFaqComponent } from './edit-faq.component';
import { AuthGuard } from '../../../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: EditFaqComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditFaqRoutingModule { }
