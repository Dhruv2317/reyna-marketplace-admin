import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
  CommonModule,
    FormsModule,
    AuthLayoutRoutingModule,
    // RouterModule.forChild(AuthLayoutRoutes)
  ],
  providers:[],
})
export class AuthModule { }
