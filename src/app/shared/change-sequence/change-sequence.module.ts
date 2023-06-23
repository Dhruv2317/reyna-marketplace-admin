import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeSequenceComponent } from './change-sequence.component';
import { ChangeSequenceRoutingModule } from './change-sequence-routing.module';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImagePreviewModule } from '../image-preview/image-preview.module';

@NgModule({
  declarations: [ChangeSequenceComponent],
  imports: [
    CommonModule,
    ChangeSequenceRoutingModule,
    FormsModule,
    ImagePreviewModule,
    DragDropModule
  ],
  exports: [ChangeSequenceComponent]
})
export class ChangeSequenceModule { }
