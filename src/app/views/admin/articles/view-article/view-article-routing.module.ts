import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewArticleComponent } from './view-article.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ViewArticleComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewArticleRoutingModule { }
