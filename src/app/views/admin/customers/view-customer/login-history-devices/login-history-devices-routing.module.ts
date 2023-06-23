import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginHistoryDevicesComponent } from './login-history-devices.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: LoginHistoryDevicesComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginHistoryDevicesRoutingModule { }
