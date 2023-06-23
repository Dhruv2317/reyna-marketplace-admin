import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListItemComponent } from './menu-list-item.component';
import { NavService } from './nav.service';



@NgModule({
  declarations:[MenuListItemComponent],
  imports: [CommonModule],
  exports: [
    MenuListItemComponent,
  ],
  providers:[NavService]
})
export class MenuListItemModule { }
