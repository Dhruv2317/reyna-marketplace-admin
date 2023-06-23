import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '', component: CategoriesComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', loadChildren:()=>import('./categories-list/categories-list.module').then(List=>List.CategoriesListModule) },
        { path: 'view/:id', loadChildren:()=>import('./categories-view/categories-view.module').then(View=>View.CategoriesViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
