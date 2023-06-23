import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSubcategoryModalComponent } from './select-subcategory-modal.component';
import {SelectSubcategoryModalService} from './select-subcategory-modal.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [SelectSubcategoryModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,ReactiveFormsModule,
  ],
  exports:[SelectSubcategoryModalComponent],
  providers:[SelectSubcategoryModalService]
})
export class SelectSubcategoryModalModule { }
