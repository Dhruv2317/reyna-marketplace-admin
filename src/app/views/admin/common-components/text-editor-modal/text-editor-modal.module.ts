import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorModalComponent } from './text-editor-modal.component';
import { TextEditorModalService } from './text-editor-modal.service';
import { NgxEditorModule } from 'ngx-editor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TextEditorModalComponent
  ],
  imports: [
  CommonModule,
    FormsModule,ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxEditorModule
  ],
  providers:[TextEditorModalService],
  exports:[TextEditorModalComponent]
})
export class TextEditorModalModule { }
