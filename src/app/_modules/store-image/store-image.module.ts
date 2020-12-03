import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreImageComponent } from './store-image/store-image.component';
import { FileuploadModule } from '../fileupload/fileupload.module';
import { ImgCropperModule } from '../img-cropper/img-cropper.module';
import { SharedModule } from 'src/app/views/shared/shared.module';



@NgModule({
  declarations: [StoreImageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FileuploadModule,
    ImgCropperModule
  ],
  exports: [StoreImageComponent]
})
export class StoreImageModule { }
