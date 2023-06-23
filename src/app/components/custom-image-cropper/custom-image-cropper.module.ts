import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomImageCropperComponent } from './custom-image-cropper.component';
import { CustomImageCropperService } from './custom-image-cropper.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [CustomImageCropperComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ImageCropperModule
  ],
  exports:[CustomImageCropperComponent],
  providers:[CustomImageCropperService]
})
export class CustomImageCropperModule { }
