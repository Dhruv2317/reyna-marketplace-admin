import { NgModule } from '@angular/core';
import { ReasonModalComponent } from './reason-modal.component';
import { ReasonModalService } from './reason-modal.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ReasonModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[ReasonModalService],
  exports:[ReasonModalComponent]
})
export class ReasonModalModule { }
