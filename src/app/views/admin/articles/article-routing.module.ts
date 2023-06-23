import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: '', component: ArticleComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=>import('./article-list/article-list.module').then(FL=>FL.ArticleListModule) },
      { path: 'create', loadChildren:()=>import('./create-article/create-article.module').then(FC=>FC.CreateArticleModule) },
      { path: 'edit/:id', loadChildren:()=>import('./create-article/create-article.module').then(FE=>FE.CreateArticleModule) },
      { path: 'view/:id', loadChildren:()=>import('./view-article/view-article.module').then(FV=>FV.ViewArticleModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
