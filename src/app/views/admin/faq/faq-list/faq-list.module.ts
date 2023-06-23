import { NgModule } from '@angular/core';
import { FaqListRoutingModule } from './faq-list-routing.module';
import { FaqListComponent } from './faq-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FaqListComponent],
  imports: [
    SharedModule,
    FaqListRoutingModule
  ]
})
export class FaqListModule { }
