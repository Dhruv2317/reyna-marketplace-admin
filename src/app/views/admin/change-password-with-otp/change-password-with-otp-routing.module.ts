import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordWithOtpComponent } from './change-password-with-otp.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [
  {
      path: "", component: ChangePasswordWithOtpComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordWithOtpRoutingModule { }
