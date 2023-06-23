import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AttributesComponent } from './attributes.component';

const routes: Routes = [
  {
    path: '', component: AttributesComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', loadChildren:()=>import('./attributes-list/attributes-list.module').then(List=>List.AttributesListModule) },
        { path: 'view/:id', loadChildren:()=>import('./attributes-view/attributes-view.module').then(View=>View.AttributesViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
