import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeSequenceFaqComponent } from './change-sequence-faq.component';
import { ChangeSequenceFaqRoutingModule } from './change-sequence-faq-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ChangeSequenceFaqComponent],
  imports: [
    SharedModule,
    ChangeSequenceFaqRoutingModule,
    DragDropModule
  ]
})
export class ChangeSequenceFaqModule { }
