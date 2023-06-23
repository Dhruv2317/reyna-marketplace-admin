import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Helper } from 'src/app/services/helper.service';
import { BrandAddEditModalComponent } from './brand-add-edit-modal.component';
import { BrandAddEditModalService } from './brand-add-edit-modal.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    BrandAddEditModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers:[BrandAddEditModalService, Helper],
  exports:[BrandAddEditModalComponent]
})
export class BrandAddEditModalModule { }
