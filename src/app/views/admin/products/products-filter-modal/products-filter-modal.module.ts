import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsFilterModalComponent } from './products-filter-modal.component';
import { ProductsFilterModalService } from './products-filter-modal.service';

@NgModule({
  declarations: [
    ProductsFilterModalComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[ProductsFilterModalService],
  exports: [ProductsFilterModalComponent]
})
export class ProductsFilterModalModule { }
