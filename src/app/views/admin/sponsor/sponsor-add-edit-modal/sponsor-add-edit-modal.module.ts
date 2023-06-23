import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Helper } from 'src/app/services/helper.service';
import { SponsorAddEditModalComponent } from './sponsor-add-edit-modal.component';
import { SponsorAddEditModalService } from './sponsor-add-edit-modal.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    SponsorAddEditModalComponent
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
  providers:[SponsorAddEditModalService, Helper],
  exports:[SponsorAddEditModalComponent]
})
export class SponsorAddEditModalModule { }
