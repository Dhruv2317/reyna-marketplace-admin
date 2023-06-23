import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerListComponent } from './dealer-list.component';

const routes: Routes = [{
  path:'',component:DealerListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerListRoutingModule { }
