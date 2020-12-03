import { format } from 'path';
import { Observable } from 'rxjs';

export function FileExtentionValidator(formats: Array<string>): (file: File) => string | null {
    // var ext = file.name.substring(file.name.lastIndexOf('.') + 1);
    // if(formats.find(format=>ext == format)) return true;
    // else return false;

    return (file: File) => {
        const fileFormats = formats;
        const fileExt = file.name.substring(file.name.lastIndexOf('.'));
        if (fileFormats.find((fmt => fmt === fileExt))) return null;
        else return 'valid file type - [ ' + fileFormats.toString() + ' ]';
    }
}

export function ImageMinSizeValidator(width: number = null, height: number = null): (file: File) => Observable<{ [key: string]: string; } | null> {
    return (file: File) => {
        return new Observable((observer) => {
            let reader = new FileReader();
            reader.readAsDataURL(this.fileUptoLoad);
            reader.onload = (e: any) => {
                var img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    if (img.width < 500 || img.height < 500) observer.next({ minSize: 'Minimum size not sufficient' });
                    else observer.next(null);
                }
            }
        })
    }
}

// onFileChanged(event) {
    //   /* File upload Required function */
    //   this.fileUptoLoad = event.target.files[0];
    //   if (this.fileUptoLoad) {
    //     if (!this.dataService.validateFileExtension(this.fileUptoLoad.name)) {
    //       this.alertservice.showNotification('Selected file format is not supported', 'error')
    //       return false;
    //     }
    //     if (!this.dataService.validateFileSize(this.fileUptoLoad.size)) {
    //       this.alertservice.showNotification('File to be uploaded should be less than 5MB', 'error');
    //       return false;
    //     }
    //     let reader = new FileReader();
    //     reader.readAsDataURL(this.fileUptoLoad);

    //     reader.onload = (e: any) => {
    //       var img = new Image();
    //       img.src = e.target.result;
    //       img.onload = () => {
    //         if (img.width < 500 || img.height < 500) {
    //           this.alertservice.showNotification('Minimum size 500*500 pixel', 'error')
    //           return false;
    //         }
    //         let form_data = new FormData();
    //         form_data.append('store_image', this.fileUptoLoad);
    //         this.alertservice.showLoader();
    //         event.target.value = '';
    //         this.restApiservice.pushSaveFileToStorageWithFormdata(form_data, 'store/logo', (response) => {
    //           if (response && response['success']) {
    //             this.alertservice.hideLoader();
    //             this.imageUrl = response['data'];
    //           } else if (response && !response['success']) {
    //             this.imageUrl = null;
    //             this.alertservice.hideLoader();
    //             this.alertservice.showNotification(response['message'], 'error');
    //           } else {
    //             this.imageUrl = null;
    //             this.alertservice.hideLoader();
    //             this.alertservice.showNotification('Something went wrong, Please try again', 'error');
    //           }
    //         }
    //           , err => this.imageUrl = null);
    //       };
    //     }


    //   } else {
    //     this.alertservice.showNotification('No file selected', 'error');
    //   }
    // }