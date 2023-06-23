import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import {  Dimensions,ImageTransform,ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalRef } from 'ngx-bootstrap/modal'
import {CustomImageCropperService} from './custom-image-cropper.service';

@Component({
  selector: 'app-custom-image-cropper',
  templateUrl: './custom-image-cropper.component.html',
  styleUrls: ['./custom-image-cropper.component.scss']
})
export class CustomImageCropperComponent implements OnInit {

  @ViewChild('ImageCropped') imageCropper!: ImageCropperComponent;
  @Output() onImageSaved: EventEmitter<any> = new EventEmitter();

  constructor(private _bsModalRef:BsModalRef,
  private _customImageCropperService:CustomImageCropperService) { }

  details:any ;

  async ngOnInit(): Promise<void>{
     this.details= this._customImageCropperService.getFormData();
     this.base64Image =  this.details.base64image;
     console.log('details=',this.details);
  }

  saveCroppedImage(){
     let file_name = this.details && this.details.file_name?this.details.file_name:'image-'+(new Date().getTime())+'.png';
     let fileSaved:File= this.dataURLtoFile(this.croppedImage,file_name);
     this.onImageSaved.emit(fileSaved);
     this.closeModal();
  }

  dataURLtoFile(dataurl:any, filename:any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  closeModal(){
    this.resetImage();
    this._bsModalRef.hide()
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string='';
  base64Image:any;
  loading = false;

  fileChangeEvent(event: any): void {
    this.loading = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    this.loading = false;
  }

  loadImageFailed() {
    console.error('Load image failed');
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => { // Use timeout because rotating image is a heavy operation and will block the ui thread
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

}
