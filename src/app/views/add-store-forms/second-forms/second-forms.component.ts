import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { API_URL_LINK } from 'src/environments/environment.prod';

declare let $: any;

@Component({
  selector: 'app-second-forms',
  templateUrl: './second-forms.component.html',
  styleUrls: ['./second-forms.component.scss']
})
export class SecondFormsComponent implements OnInit {

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private authenticateService: AuthenticationService,
    private dataService: DataService,
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


  Cuisines: any = ['African: Ethiopian', 'African: other', 'Alcohol', 'American', 'New York', 'Asian fusion', 'Asian: other', 'BBQ', 'Bakery']

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if (localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')) {
      // obj.authenticateService.checkExpiryStatus();
      obj.getstoreDetails();
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
      if (this.imageUrl) data.store_logo = this.imageUrl;
      // console.log(data);
      if (this.add_edit_type == 'add') {
        this.alertservice.showLoader();
        this.restApiservice.postAPI('api/stores/storedata', data, (response) => {
          console.log('store post called', response);
          if (response && response['success'] && response['data']) {
            // console.log(response);
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
        if (this.claimCreation) data.claim_store_id = this.store_id;
        else data.store_id = this.store_id;
        this.alertservice.showLoader();
        this.restApiservice.putAPI(`api/stores/${this.store_id}/storedata`, data, (response) => {
          if (response && response['success'] && response['data']) {
            // console.log(response);
            this.alertservice.hideLoader();
            // console.log('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step'])

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

  getstoreDetails() {
    // this.alertservice.showLoader();
    if (this.store_id) {
      this.restApiservice.getData(`api/stores/${this.store_id}/storedata`, (response) => {
        // console.log(response);
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
          })
        }
      });
    }
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
              this.imageUrl = API_URL_LINK + response['data'];
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

  // debug() {
  //   console.log('claim creation', this.claimCreation);
  // }
}



export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}