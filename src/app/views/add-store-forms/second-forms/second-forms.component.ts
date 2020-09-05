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
import { StringHelperService } from 'src/app/services/string-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreMenuTime } from 'src/app/_models/store-menu';

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
  daysTouched: boolean = false;
  claimCreation: boolean = false;

  submitting: boolean = false;
  availabilityTouched = false;

  timing: FormGroup = new FormGroup({
    startTime: new FormControl('Select'),
    endTime: new FormControl('Select')
  }, this.timingValidator())

  time: Array<string> = [
    '12:00AM'
    , '12:30AM'
    , '01:00AM'
    , '01:30AM'
    , '02:00AM'
    , '02:30AM'
    , '03:00AM'
    , '03:30AM'
    , '04:00AM'
    , '04:30AM'
    , '05:00AM'
    , '05:30AM'
    , '05:00AM'
    , '05:30AM'
    , '06:00AM'
    , '06:30AM'
    , '07:00AM'
    , '07:30AM'
    , '08:00AM'
    , '08:30AM'
    , '09:00AM'
    , '09:30AM'
    , '10:00AM'
    , '10:30AM'
    , '11:00AM'
    , '11:30AM'
    , '12:00PM'
    , '12:30PM'
    , '01:00PM'
    , '01:30PM'
    , '02:00PM'
    , '02:30PM'
    , '03:00PM'
    , '03:30PM'
    , '04:00PM'
    , '04:30PM'
    , '05:00PM'
    , '05:30PM'
    , '05:00PM'
    , '05:30PM'
    , '06:00PM'
    , '06:30PM'
    , '07:00PM'
    , '07:30PM'
    , '08:00PM'
    , '08:30PM'
    , '09:00PM'
    , '09:30PM'
    , '10:00PM'
    , '10:30PM'
    , '11:00PM'
    , '11:30PM'
  ]

  selectedDays: Array<string> = [];
  availability: Array<StoreMenuTime> = [];
  finalAvailability: Array<StoreMenuTime> = [];

  deletedAvailability: Array<StoreMenuTime> = [];

  days: { [key: string]: boolean } = {
    "monday": false,
    "tuesday": false,
    "wednesday": false,
    "thursday": false,
    "friday": false,
    "saturday": false,
    "sunday": false,
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private authenticateService: AuthenticationService,
    private dataService: DataService,
    private stringHelper: StringHelperService,
    private _modalService: NgbModal
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
      console.log('store details called');
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
      data.opening_hours = [];
      this.finalAvailability.forEach((a) => {
        let menuTime: any = {};
        menuTime.days = a.day;
        menuTime.start_time = a.startTime;
        menuTime.end_time = a.endTime;
        menuTime.marked_as_closed = a.markedAsClose;
        // menuTime.active_flag = 0;
        data.opening_hours.push(menuTime);
      })
      if (this.add_edit_type == 'add') {
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
        if (this.claimCreation) data.claim_store_id = this.store_id;
        else data.store_id = this.store_id;
        this.alertservice.showLoader();
        this.restApiservice.putAPI(`api/stores/${this.store_id}/storedata`, data, (response) => {
          if (response && response['success'] && response['data']) {
            // console.log(response);
            this.alertservice.hideLoader();
            // console.log('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step'])
            console.log('redirecting to ', '/store/step2/' + response['data']['store_id'] + '/' + response['data']['next_step']);
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
            this.finalAvailability = this.readAvailability(element.opening_hours);
          })
        }
      });
    }
  }

  //fucntion to read availability aquired from the backend
  readAvailability(availability: any): Array<StoreMenuTime> {
    let result: Array<StoreMenuTime> = []
    for (const a in availability) {
      result.push(new StoreMenuTime(
        availability[a].menu_timings_id
        , availability[a].days
        , availability[a].start_time
        , availability[a].end_time
        , availability[a].marked_as_closed ? true : false))
    }
    return result;
  }

  changeCuisine() {
    let typeCuisine = this.storeDetailform.value.typeCuisine;
  }

  get modalService(): NgbModal {
    return this._modalService;
  }

  addRemvDay(day: string, add: boolean) {
    this.daysTouched = true;
    if (add) {
      this.selectedDays.push(day);
    } else {
      let index = this.selectedDays.findIndex((selectedDay) => { return selectedDay === day });
      this.selectedDays.splice(index, 1);
    }
  }
  addAvailability() {
    if (this.timing.invalid || this.selectedDays.length == 0) {
      this.timing.markAllAsTouched();
      this.daysTouched = true;
      return;
    }
    this.availabilityTouched = true;

    let menuTime = null;
    this.selectedDays.forEach(day => {
      menuTime = new StoreMenuTime(null, day, this.timing.controls.startTime.value, this.timing.controls.endTime.value, false);
      this.insertIntoAvailability(this.availability, menuTime);
    });
  }

  insertIntoAvailability(availability: Array<StoreMenuTime>, menuTime: StoreMenuTime) {
    for (let i = 0; i <= availability.length; i++) {

      //case: menuTime is the largest in the array
      if (i == availability.length) {
        availability.push(menuTime);
        break;
      }

      let compVal = this.menuTimeComp(menuTime, availability[i]);

      if (compVal < 0) {
        availability.splice(i, 0, menuTime);
        break;
      }

      //donot insert if there is an identical StoreMenuTime
      if (compVal == 0) break;
    }
  }

  menuTimeComp(first: StoreMenuTime, second: StoreMenuTime) {
    const dayValue = {
      monday: 1
      , tuesday: 2
      , wednesday: 3
      , thursday: 4
      , friday: 5
      , saturday: 6
      , sunday: 7
    }
    //are first and second different days
    if (dayValue[first.day] - dayValue[second.day]) return dayValue[first.day] - dayValue[second.day];

    //compare start-times
    let firstSTime = new Date('1/1/0001 ' + first.startTime.substr(0, 5) + ':00 ' + first.startTime.substr(5, 2)).getTime();
    let secondSTime = new Date('1/1/0001 ' + second.startTime.substr(0, 5) + ':00 ' + second.startTime.substr(5, 2)).getTime();

    if (firstSTime !== secondSTime) return firstSTime - secondSTime;

    //compare end-times
    let firstETime = new Date('1/1/0001 ' + first.endTime.substr(0, 5) + ':00 ' + first.endTime.substr(5, 2)).getTime();
    let secondETime = new Date('1/1/0001 ' + second.endTime.substr(0, 5) + ':00 ' + second.endTime.substr(5, 2)).getTime();

    return firstETime - secondETime;
  }

  readyToSave(): boolean {
    if (this.availability.length == 0) {
      return false;
    }
    return true;
  }

  saveTiming() {
    if (!this.readyToSave()) {
      this.availabilityTouched = true;
      this.alertservice.showNotification('Please complete the form below');
      return;
    }

    let data: any = {}
    data.opening_time = [];

    this.availability.forEach((a) => {
      let menuTime: any = {};
      menuTime.days = a.day;
      menuTime.start_time = a.startTime;
      menuTime.end_time = a.endTime;
      menuTime.marked_as_closed = a.markedAsClose;
      // menuTime.active_flag = 0;
      data.opening_time.push(menuTime);
    })
    this.submitting = true;

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