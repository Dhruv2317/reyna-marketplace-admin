import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CategoriesViewComponent } from './categories-view.component';

const routes: Routes = [
  {
    path: '', component: CategoriesViewComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren:()=>import('./category-info/category-info.module').then(cat=>cat.CategoryInfoModule) },
      { path: 'subcategories', loadChildren:()=>import('./category-subcategories/category-subcategories.module').then(subcat=>subcat.CategorySubcategoriesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesViewRoutingModule { }
