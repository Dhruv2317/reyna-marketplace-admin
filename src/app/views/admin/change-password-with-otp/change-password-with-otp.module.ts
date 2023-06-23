import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordWithOtpComponent } from './change-password-with-otp.component';
import { ChangePasswordWithOtpRoutingModule} from './change-password-with-otp-routing.module';

@NgModule({
  declarations: [ChangePasswordWithOtpComponent],
  imports: [
    SharedModule,
    ChangePasswordWithOtpRoutingModule,
  ]
})
export class ChangePasswordWithOtpModule { }
