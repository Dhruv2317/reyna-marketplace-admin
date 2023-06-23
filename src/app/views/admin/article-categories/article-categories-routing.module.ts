import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ArticleCategoriesComponent } from './article-categories.component';

const routes: Routes = [
  {
    path: '', component: ArticleCategoriesComponent, canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', loadChildren:()=>import('./article-categories-list/article-categories-list.module').then(List=>List.ArticleCategoriesListModule) },
        { path: 'view/:id', loadChildren:()=>import('./article-categories-view/article-categories-view.module').then(View=>View.ArticleCategoriesViewModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCategoriesRoutingModule { }
