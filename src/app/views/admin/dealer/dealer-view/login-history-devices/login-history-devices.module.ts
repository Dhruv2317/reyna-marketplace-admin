import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginHistoryDevicesRoutingModule } from './login-history-devices-routing.module';
import { LoginHistoryDevicesComponent } from './login-history-devices.component';
import { Helper } from 'src/app/services/helper.service';

@NgModule({
  declarations: [LoginHistoryDevicesComponent],
  imports: [
  CommonModule,
    LoginHistoryDevicesRoutingModule
  ],
  providers:[Helper]
})
export class LoginHistoryDevicesModule { }
