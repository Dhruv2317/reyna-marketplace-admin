import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturersComponent } from './manufacturers.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
     path: '', component: ManufacturersComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturersRoutingModule { }
