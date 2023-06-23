import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportsNavbarComponent } from './reports-navbar.component';



@NgModule({
    declarations: [ReportsNavbarComponent],
    imports: [CommonModule,RouterModule],
    providers: [],
    exports: [ReportsNavbarComponent]
})
export class ReportsNavbarModule { }
