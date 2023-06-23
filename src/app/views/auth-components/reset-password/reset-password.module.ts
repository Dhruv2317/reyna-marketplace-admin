
import { NgModule } from "@angular/core";
import { HttpInterceptorModule } from 'src/app/interceptors/http.interceptor.module';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from "./reset-password.component";
import { ResetPasswordService } from "./reset-password.service";
import { ResetPasswordRoutingModule } from "./reset-password-route.module";

@NgModule({
  imports: [ CommonModule,
    FormsModule,ReactiveFormsModule,
    ResetPasswordRoutingModule,
    HttpInterceptorModule],
  providers:[ResetPasswordService],
  declarations: [
    ResetPasswordComponent
  ]
})

export class ResetPasswordModule {}
