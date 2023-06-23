import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterTemplatesEditorComponent } from './newsletter-templates-editor.component';

const routes: Routes = [
  {
    path:'',component:NewsletterTemplatesEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterTemplatesEditorRoutingModule { }
