import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributesListComponent } from './attributes-list.component';

const routes: Routes = [
  { path: '', component: AttributesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesListRoutingModule { }
