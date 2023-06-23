import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MenuListItemModule } from "src/app/shared/menu-list-item/menu-list-item.module";

@NgModule({
  declarations: [NavbarComponent],
  imports:[
  CommonModule,
  RouterModule,
  BsDropdownModule,
  MenuListItemModule
  ],
  exports:[NavbarComponent],
  providers:[],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class NavbarModule { }
