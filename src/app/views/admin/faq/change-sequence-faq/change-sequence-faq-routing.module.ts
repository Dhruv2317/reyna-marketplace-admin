import { NgModule } from '@angular/core';
import { ChangeSequenceFaqComponent } from './change-sequence-faq.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ChangeSequenceFaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeSequenceFaqRoutingModule { }
