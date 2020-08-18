import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-store-menu-overview-detailed',
  templateUrl: './store-menu-overview-detailed.component.html',
  styleUrls: ['./store-menu-overview-detailed.component.scss']
})
export class StoreMenuOverviewDetailedComponent implements OnInit {
  dropdownChild = true;
  right_image:string = "../../../assets/images/ico_right.png";
  down_image:string = "../../../assets/images/ico_down.png";
  imageUrl: string = null;
  errors: string;
  fileUptoLoad: File;

  constructor(
    private _modalService: NgbModal,
    public route: ActivatedRoute,
    private router: Router,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  get modalService(): NgbModal{
    return this._modalService;
  }

  toggleClass() {
    this.dropdownChild = !this.dropdownChild;
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  // opencategoryCentered(category) {
  //   this.modalService.open(category, { centered: true });
  // }

  // openmodifierCentered(modifier) {
  //   this.modalService.open(modifier, { centered: true });
  // }

  onFileChanged(event) {
    this.fileUptoLoad = event.target.files[0];
    if (this.fileUptoLoad) {
      if (!this.dataService.validateFileSize(this.fileUptoLoad.size)) {
        this.alertService.showNotification('File to be uploaded should be less than 5MB', 'error')
        return false;
      }
      if (!this.dataService.validateFileExtension(this.fileUptoLoad.name)) {
        this.alertService.showNotification('Selected file format is not supported', 'error')
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(this.fileUptoLoad);

      reader.onload = (e: any) => {
        var img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          if (img.width < 500 || img.height < 500) {
            this.alertService.showNotification('Minimum size 500*500 pixel', 'error')
            return false;
          }
          let form_data = new FormData();
          form_data.append('item_image', this.fileUptoLoad);
          this.alertService.showLoader();
          this.restApiService.pushSaveFileToStorageWithFormdata(form_data, 'store/items/upload/image', (response) => {
            if(response && response['success'] && response['data']) { 
              this.imageUrl=response['data'];
            this.alertService.hideLoader();
            }
          });
        }
      }
    } else {
        this.alertService.showNotification('No file selected', 'error');
    }
  }
}
