import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributeInfoComponent } from './attribute-info.component';

const routes: Routes = [
  {
    path:'',component:AttributeInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeInfoRoutingModule { }
