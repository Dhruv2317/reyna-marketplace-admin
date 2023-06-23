import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
