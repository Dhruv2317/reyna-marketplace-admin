import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterTemplatesComponent } from './newsletter-templates.component';

const routes: Routes = [
  {
    path:'',component:NewsletterTemplatesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren:()=> import('./newsletter-templates-list/newsletter-templates-list.module').then(NL => NL.NewsletterTemplatesListModule) },
      { path: 'editor', loadChildren:()=> import('./newsletter-templates-editor/newsletter-templates-editor.module').then(NE => NE.NewsletterTemplatesEditorModule) },
      { path: 'editor/:id', loadChildren:()=> import('./newsletter-templates-editor/newsletter-templates-editor.module').then(NE => NE.NewsletterTemplatesEditorModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsletterTemplatesRoutingModule { }
