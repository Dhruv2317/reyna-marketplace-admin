import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule}   from '@angular/forms';

import {LoginRoutingModule} from "./login-routing.module"
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    LoginRoutingModule
  ],
  providers:[LoginService],
  declarations: [LoginComponent],
})
export class LoginModule { }
