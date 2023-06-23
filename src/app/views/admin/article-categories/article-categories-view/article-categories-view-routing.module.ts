import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ArticleCategoriesViewComponent } from './article-categories-view.component';

const routes: Routes = [
  {
    path: '', component: ArticleCategoriesViewComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren:()=>import('./article-category-info/article-category-info.module').then(cat=>cat.ArticleCategoryInfoModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCategoriesViewRoutingModule { }
