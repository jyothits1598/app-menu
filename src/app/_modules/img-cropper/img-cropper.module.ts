import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgCropperComponent } from './img-cropper/img-cropper.component';
import { ImageCropperComponent, ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [ImgCropperComponent],
  imports: [
    CommonModule, 
    ImageCropperModule
  ],
  exports: [ImgCropperComponent]
})
export class ImgCropperModule { }
