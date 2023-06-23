import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './master-layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './master-layout/admin-layout/admin-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  { path: 'account',
    component: AuthLayoutComponent,
    loadChildren: () => import('./master-layout/auth-layout/auth-layout.module').then(m => m.AuthModule)
  },
  { path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./master-layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: 'resetpassword/:token',
    loadChildren: () => import('src/app/views/auth-components/reset-password/reset-password.module').then(resetPassword=>resetPassword.ResetPasswordModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
