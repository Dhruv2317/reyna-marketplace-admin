import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FaqComponent } from './faq.component';

const routes: Routes = [
  {
    path: '', component: FaqComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=>import('./faq-list/faq-list.module').then(FL=>FL.FaqListModule) },
      { path: 'create', loadChildren:()=>import('./create-faq/create-faq.module').then(FC=>FC.CreateFaqModule) },
      { path: 'edit/:id', loadChildren:()=>import('./edit-faq/edit-faq.module').then(FE=>FE.EditFaqModule) },
      { path: 'view/:id', loadChildren:()=>import('./view-faq/view-faq.module').then(FV=>FV.ViewFaqModule) },
      { path: 'change-sequence', loadChildren:()=>import('./change-sequence-faq/change-sequence-faq.module').then(FCS=>FCS.ChangeSequenceFaqModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
