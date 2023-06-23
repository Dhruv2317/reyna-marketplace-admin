import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { CreateArticleRoutingModule } from './create-article-routing.module';
import { CreateArticleComponent } from './create-article.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    SharedModule,
    CreateArticleRoutingModule,
    NgxEditorModule
  ]
})
export class CreateArticleModule { }
