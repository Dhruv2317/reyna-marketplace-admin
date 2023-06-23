
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import {AdminLayoutComponent} from './admin-layout.component';
import { FooterModule } from '../../components/footer/footer.module';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {SidebarModule} from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AdminLayoutRoutingModule
  ],
  providers:[]
})
export class AdminLayoutModule { }
