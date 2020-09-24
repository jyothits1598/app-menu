import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { API_URL_LINK } from 'src/environments/environment.prod';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreMenuTime } from 'src/app/_models/store-menu';
import { AvailabilityToBackend, ReadAvailability, TimeAvailability } from 'src/app/_modules/time-availability/_model/time-availability';
import { ModalService } from '../../shared/services/modal.service';
import { ModalRef } from '../../shared/_model/modal-ref';

declare let $: any;

@Component({
  selector: 'app-second-forms',
  templateUrl: './second-forms.component.html',
  styleUrls: ['./second-forms.component.scss']
})
export class SecondFormsComponent implements OnInit {

  add_image:string = "../../../assets/images/ico_add_blue.png";
  edit_image:string = "../../../assets/images/ico_edit_blue.png";

  storeDetailform: FormGroup;
  storeNameSubmit = false;
  storeAddressSubmit = false;
  typeCuisineSubmit = false;
  descriptionItemSubmit = false;
  facebookBussinessSubmit = false;
  googleBussinessSubmit = false;
  returnUrl: string;
  store_id: number;
  storename: string;
  storeAddress: string;
  cuisine: string;
  getDescription: string;
  store_add_or_edit_action_type: string;
  add_edit_type: string = 'add';
  getgoogleBussiness: string;
  getfacebookBussiness: string;
  imageUrl: string = null;
  fileUptoLoad: File;
  logoUploadSucceeded: boolean = false;
  width: number;
  height: number;
  errors = new Array();
  firstFormError = false;
  claimCreation: boolean = false;

  storeOpeningHours: Array<TimeAvailability> = [];
  storeOpeningHoursCache: Array<TimeAvailability>;
  modalRef: ModalRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private dataService: DataService,
    private stringHelper: StringHelperService,
    public modalService: ModalService
  ) {
    this.store_id = +this.route.snapshot.paramMap.get('store-id');
    // if (!this.store_id) if (+localStorage.getItem('storeCreationId')) this.store_id = +localStorage.getItem('storeCreationId');
    this.add_edit_type = this.route.snapshot.queryParams['type'] || 'add';
    this.claimCreation = this.route.snapshot.queryParams['claim'] == 'true' ? true : false;
  }

  options = {
    componentRestrictions: {
      country: ["AU"]
    }
  }
  public AddressChange(address: any) {
    //setting address from API to local variable 
    //  this.storeAddress=address.formatted_address;
    if (address) {
      this.storeAddress = address.name + "," + address.formatted_address;
    }
  }


  Cuisines = new Array(); 

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if (localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')) {
      // obj.authenticateService.checkExpiryStatus();
      obj.getstoreDetails();
      obj.getTypeOfCusine();
    }

    this.storeDetailform = this.formBuilder.group({
      storeName: [null, [Validators.required, removeSpaces]],
      storeAddress: ['', Validators.required],
      typeCuisine: ['', Validators.required],
      descriptionItem: ['', Validators.required],
      google_business_url: [''],
      facebook_url: [''],
    });
  }

  get f() { return this.storeDetailform.controls; }

  storeDetails() {
    this.storeNameSubmit = true;
    this.storeAddressSubmit = true;
    this.typeCuisineSubmit = true;
    this.descriptionItemSubmit = true;
    this.facebookBussinessSubmit = true;
    this.googleBussinessSubmit = true;

    if (this.storeDetailform.invalid) {
      return;
    }

    if (this.storeDetailform.valid) {
      let data: any = {
        'store_name': this.storeDetailform.value.storeName,
        'store_address': this.storeAddress,
        'type_of_cuisine': this.storeDetailform.value.typeCuisine,
        'description': this.storeDetailform.value.descriptionItem,
        'google_business_url': this.storeDetailform.value.google_business_url,
        'facebook_url': this.storeDetailform.value.facebook_url,
        'store_logo': this.imageUrl
      };
      // console.log('extracting logo url', this.imageUrl, this.stringHelper.ExtractFileName)
      if (this.imageUrl) data.store_logo = this.stringHelper.ExtractFileName(this.imageUrl);
      data.opening_hours = AvailabilityToBackend(this.storeOpeningHours);
      
      if (this.add_edit_type == 'add') {
        if (this.claimCreation) data.claim_store_id = this.store_id;
        this.alertservice.showLoader();
        this.restApiservice.postAPI('api/stores/storedata', data, (response) => {
          console.log('store post called', response);
          if (response && response['success'] && response['data']) {
            this.alertservice.hideLoader();
            // localStorage.setItem('storeCreationId', response['data']['store_id']);
            return this.router.navigateByUrl('/store/step2/' + response['data']['store_id'] + '/' + response['data']['next_step']);
          } else if (response && !response['success'] && response['error']['error']) {
            let i = 0;
            for (let key in response['error']['error']) {
              this.firstFormError = true;
              this.errors[key] = response['error']['error'][key][0];
              this.alertservice.showNotification(this.errors[key], 'error');
            }
          } else {
            this.alertservice.showNotification('Something went wrong', 'error');
          }
          this.alertservice.hideLoader();
        });
      }
      else if (this.add_edit_type == 'edit') {
      data.store_id = this.store_id;
        this.alertservice.showLoader();
        this.restApiservice.putAPI(`api/stores/${this.store_id}/storedata`, data, (response) => {
          if (response && response['success'] && response['data']) {
            // console.log(response);
            this.alertservice.hideLoader();
            // console.log('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step'])
            // console.log('redirecting to ', '/store/step2/' + response['data']['store_id'] + '/' + response['data']['next_step']);
            return this.router.navigateByUrl('/store/step2/' + response['data']['store_id'] + '/' + response['data']['next_step']);
          } else if (response && !response['success'] && response['error']['error']) {
            let i = 0;
            for (let key in response['error']['error']) {
              this.firstFormError = true;
              this.errors[key] = response['error']['error'][key][0];
              this.alertservice.showNotification(this.errors[key], 'error');
            }
          } else {
            this.alertservice.showNotification('Something went wrong', 'error');
          }
        });
      }
    } else {
      this.alertservice.showNotification('Something went wrong', 'error');
      this.alertservice.hideLoader();
    }

  }

  getTypeOfCusine() {
     this.alertservice.showLoader();
     this.restApiservice.getData(`api/stores/cuisines`, (response) => {
      this.alertservice.hideLoader();
      if (response && response['success'] && response['data']) {
        this.Cuisines=response['data'];
      }
    });
 }
  getstoreDetails() {
    // this.alertservice.showLoader();
    if (this.store_id) {
      this.restApiservice.getData(`api/stores/${this.store_id}/storedata`, (response) => {
        console.log(response);
        if (response && response['success'] && response['data']) {
          response['data'].forEach(element => {
            this.imageUrl = element.store_logo;
            this.storename = element.store_name;
            this.storeAddress = element.store_address;
            this.cuisine = element.type_of_cuisine;
            this.getDescription = element.description;
            this.getgoogleBussiness = element.google_business_url;
            this.getfacebookBussiness = element.facebook_url;
            this.storeDetailform.get('storeName').setValue(this.storename);
            this.storeDetailform.get('storeAddress').setValue(this.storeAddress);
            this.storeDetailform.get('typeCuisine').setValue(this.cuisine);
            this.storeDetailform.get('descriptionItem').setValue(this.getDescription);
            this.storeDetailform.get('google_business_url').setValue(this.getgoogleBussiness);
            this.storeDetailform.get('facebook_url').setValue(this.getfacebookBussiness);
            this.alertservice.hideLoader();
            this.storeOpeningHours = ReadAvailability(element.opening_hours);
          })
          console.log('just read availability', this.storeOpeningHours);
        }
      });
    }
  }

  startEdit(editorTemplate: TemplateRef<any>){
    this.storeOpeningHoursCache = [...this.storeOpeningHours];
    this.modalRef = this.modalService.openTemplate(editorTemplate);
  }

  changeCuisine() {
    let typeCuisine = this.storeDetailform.value.typeCuisine;
  }
  onFileChanged(event) {
    /* File upload Required function */
    this.fileUptoLoad = event.target.files[0];
    if (this.fileUptoLoad) {
      if (!this.dataService.validateFileExtension(this.fileUptoLoad.name)) {
        this.alertservice.showNotification('Selected file format is not supported', 'error')
        return false;
      }
      if (!this.dataService.validateFileSize(this.fileUptoLoad.size)) {
        this.alertservice.showNotification('File to be uploaded should be less than 5MB', 'error');
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(this.fileUptoLoad);

      reader.onload = (e: any) => {
        var img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          if (img.width < 500 || img.height < 500) {
            this.alertservice.showNotification('Minimum size 500*500 pixel', 'error')
            return false;
          }
          let form_data = new FormData();
          form_data.append('store_image', this.fileUptoLoad);
          this.alertservice.showLoader();
          this.restApiservice.pushSaveFileToStorageWithFormdata(form_data, 'store/logo', (response) => {
            if (response && response['success']) {
              this.alertservice.hideLoader();
              this.imageUrl = response['data'];
            } else if (response && !response['success']) {
              this.imageUrl = null;
              this.alertservice.hideLoader();
              this.alertservice.showNotification(response['message'], 'error');
            } else {
              this.imageUrl = null;
              this.alertservice.hideLoader();
              this.alertservice.showNotification('Something went wrong, Please try again', 'error');
            }
          }
            , err => this.imageUrl = null);
        };
      }


    } else {
      this.alertservice.showNotification('No file selected', 'error');
    }
  }

  finalizeOpeningHours(){
    this.storeOpeningHours = [...this.storeOpeningHours];
    this.modalRef.dismiss();
  }

  // debug() {
  //   console.log('claim creation', this.claimCreation);
  // }
  timingValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if ((<FormGroup>control).controls.startTime.value == 'Select'
        || (<FormGroup>control).controls.endTime.value == 'Select') return { 'noSelection': 'Start and end time are required' };

      if ((<FormGroup>control).controls.startTime.value == (<FormGroup>control).controls.endTime.value) return { 'sameSelection': 'Start and end time can not be the same' };

      return null;
    };
  }

}



export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}