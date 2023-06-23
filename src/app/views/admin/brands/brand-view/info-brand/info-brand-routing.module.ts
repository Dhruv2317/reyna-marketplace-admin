import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoBrandComponent } from './info-brand.component';

const routes: Routes = [
  { path: '', component: InfoBrandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoBrandRoutingModule { }
