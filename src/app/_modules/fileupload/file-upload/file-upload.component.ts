import { AfterViewInit, Component, ContentChild, ElementRef, HostListener, ViewChild, EventEmitter, Output, Input, Renderer2, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private renderer: Renderer2) { }
  @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef;

  @HostListener('click')
  onClick() {
    if (this.accept) this.renderer.setAttribute(this.fileInput.nativeElement, 'accept', this.accept.toString())
    this.fileInput.nativeElement.click();
  }

  @Input() validators: Array<(file: File) => string | null>;
  @Input() accept: Array<string>;
  @Input() uploadApiFunction: (file: File) => Observable<string>;

  @Output() error = new EventEmitter<string>();
  @Output() file = new EventEmitter<File>();
  @Output() url = new EventEmitter<string>();

  initiateFileUpload() {
    this.fileInput.nativeElement.click();
  }

  onFileChanged(event) {
    /* File upload Required function */
    let fileToUpload = event.target.files[0];
    if (fileToUpload) {
      if (this.validators) {
        for (let i = 0; i < this.validators.length; i++) {
          const validation = this.validators[i](fileToUpload);
          if (validation) {
            this.error.emit(validation)
            return;
          }
        }
      }

      if (this.uploadApiFunction) {
        this.uploadApiFunction(fileToUpload).subscribe(
          (url) => this.url.emit(url)
        )
      }
      else this.file.emit(fileToUpload);
      this.fileInput.nativeElement.value = '';
    }
  }
}
