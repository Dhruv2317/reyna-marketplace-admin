import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DealerComponent } from './dealer.component';

const routes: Routes = [
  {
    path: '', component: DealerComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=>import('./dealer-list/dealer-list.module').then(LD=>LD.DealerListModule) },
      { path: 'view/:id', loadChildren:()=>import('./dealer-view/dealer-view.module').then(VD=>VD.DealerViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
