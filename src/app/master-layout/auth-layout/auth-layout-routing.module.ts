import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren:()=>import('src/app/views/auth-components/login/login.module').then(m => m.LoginModule )
  },
  {
    path: 'forgot-password',
    loadChildren:()=>import('src/app/views/auth-components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule )
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
