
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreviewComponent } from './image-preview.component';
import { LightboxModule } from 'ngx-lightbox';
import { Helper } from 'src/app/services/helper.service';

@NgModule({
  declarations: [
    ImagePreviewComponent
  ],
  imports: [
    CommonModule,
    LightboxModule
  ],
  providers: [Helper],
  exports: [ImagePreviewComponent]
})
export class ImagePreviewModule { }
