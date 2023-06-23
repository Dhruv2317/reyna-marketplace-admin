import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttributeValuesComponent } from './attribute-values.component';

const routes: Routes = [{
  path:'',component:AttributeValuesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeValuesRoutingModule { }
