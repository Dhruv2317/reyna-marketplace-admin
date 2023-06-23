import { NgModule } from '@angular/core';

import { ProductReviewsRoutingModule } from './product-reviews-routing.module';
import { ProductReviewsComponent } from './product-reviews.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImagePreviewModule } from 'src/app/shared/image-preview/image-preview.module';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


@NgModule({
  declarations: [
    ProductReviewsComponent
  ],
  imports: [
    SharedModule,
    ProgressbarModule,
    ImagePreviewModule,
    ProductReviewsRoutingModule
  ]
})
export class ProductReviewsModule { }
