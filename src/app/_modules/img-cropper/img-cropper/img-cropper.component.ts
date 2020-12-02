import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss']
})
export class ImgCropperComponent implements OnInit {
  @Input() image: File;
  @Output() croppedImage = new EventEmitter();
  @ViewChild('cropperTool', { read: ImageCropperComponent }) cropperTool: ImageCropperComponent

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

  constructor() { }

  ngOnInit(): void {
  }

  cropImage() {
    let imageEvent = this.cropperTool.crop();
    let file: File = this.dataURLtoFile(imageEvent.base64, 'image.png');
    this.croppedImage.emit(file);
  }

}
