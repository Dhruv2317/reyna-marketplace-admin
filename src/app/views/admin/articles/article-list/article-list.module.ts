import { NgModule } from '@angular/core';
import { ArticleListRoutingModule } from './article-list-routing.module';
import { ArticleListComponent } from './article-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    SharedModule,
    ArticleListRoutingModule
  ]
})
export class ArticleListModule { }
