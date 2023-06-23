import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ViewArticleRoutingModule } from './view-article-routing.module';
import { ViewArticleComponent } from './view-article.component';

@NgModule({
  declarations: [ViewArticleComponent],
  imports: [
    SharedModule,
    ViewArticleRoutingModule
  ]
})
export class ViewArticleModule { }
