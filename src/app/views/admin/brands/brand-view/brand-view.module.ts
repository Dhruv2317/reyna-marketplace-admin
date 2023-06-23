import { NgModule } from '@angular/core';
import { BrandViewRoutingModule } from './brand-view-routing.module';
import { BrandViewComponent } from './brand-view.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BrandViewComponent
  ],
  imports: [
    SharedModule,
    BrandViewRoutingModule
  ]
})
export class BrandViewModule { }
