import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateArticleComponent } from './create-article.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: CreateArticleComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateArticleRoutingModule { }
