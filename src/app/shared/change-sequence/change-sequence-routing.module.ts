import { NgModule } from '@angular/core';
import { ChangeSequenceComponent } from './change-sequence.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ChangeSequenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeSequenceRoutingModule { }
