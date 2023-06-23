import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterTemplatesListComponent } from './newsletter-templates-list.component';

const routes: Routes = [
  {
    path:'',component:NewsletterTemplatesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterTemplatesListRoutingModule { }
