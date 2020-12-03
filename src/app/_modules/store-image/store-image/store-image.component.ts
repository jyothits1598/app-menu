import { Component, Input, OnInit, Self, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ModalService } from 'src/app/views/shared/services/modal.service';
import { ModalRef } from 'src/app/views/shared/_model/modal-ref';
import { FileUploadComponent } from 'src/app/_modules/fileupload/file-upload/file-upload.component';
import { FileExtentionValidator } from 'src/app/_modules/fileupload/file-validators';

@Component({
  selector: 'store-image',
  templateUrl: './store-image.component.html',
  styleUrls: ['./store-image.component.scss']
})
export class StoreImageComponent implements OnInit, ControlValueAccessor {

  @Input() type: 'image' | 'logo'
  validFileFormats = ['.jpeg', '.jpg', '.png'];
  imageFileValidators = [FileExtentionValidator(this.validFileFormats)];
  logoUrl: string;
  @ViewChild('fileUpload', { read: FileUploadComponent }) fileUpload: FileUploadComponent;
  @ViewChild('cropperTemp', { read: TemplateRef }) cropperTemp: TemplateRef<any>;

  imageBeforeCrop: File;

  uploadingImage: boolean = false;
  cropperModal: ModalRef;
  constructor(@Self() public controlDir: NgControl,
    private restApiService: RestApiService,
    private modalService: ModalService) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void { }

  handleFileError(error) {

  }

  handleLogoFileUpload(file: File) {
    console.log('inside file upload', file);
    this.uploadingImage = true;
    let form = new FormData();
    form.append('store_logo', file);
    return this.restApiService.postData('store/logo', form).pipe(finalize(() => this.uploadingImage = false)).subscribe(
      (resp: any) => { this.logoUrl = resp.data; this.onChange(resp.data) }
    );
  }

  handleImageFileUpload(file: File) {
    this.uploadingImage = true;
    let form = new FormData();
    form.append('store_image', file);
    return this.restApiService.postData('api/stores/image', form).pipe(finalize(() => this.uploadingImage = false)).subscribe(
      (resp: any) => { this.logoUrl = resp.data; this.onChange(resp.data) }
    );
  }

  handleFile(file: File) {
    if (this.type === 'logo') {
      this.imageBeforeCrop = file;
      this.cropperModal = this.modalService.openTemplate(this.cropperTemp);
    } else this.handleImageFileUpload(file);
  }

  imageCropped(event) {
    console.log('image cropperd', event)
  }


  //control Value Accssor
  onChange: any = () => { };
  onTouched: any = () => { };
  writeValue(obj: any): void {
    this.logoUrl = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
