import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FAQGroupComponent } from './faq-group.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
     path: '', component: FAQGroupComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQGroupRoutingModule { }
