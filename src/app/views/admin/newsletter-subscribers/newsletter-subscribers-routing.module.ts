import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterSubscribersComponent } from './newsletter-subscribers.component';

const routes: Routes = [
  {
    path:'',component:NewsletterSubscribersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterSubscribersRoutingModule { }
