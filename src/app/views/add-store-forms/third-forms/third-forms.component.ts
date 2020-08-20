import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare let $: any;

@Component({
  selector: 'app-third-forms',
  templateUrl: './third-forms.component.html',
  styleUrls: ['./third-forms.component.scss']
})
export class ThirdFormsComponent implements OnInit {
  store_id: string;
  returnUrl: string;
  ownershipform: FormGroup;
  ownernameSubmit = false;
  businessnameSubmit = false;
  ABNnumberSubmit = false;
  checkownershipSubmit = false;
  fileSubmit = false;
  selectedFile: File;
  selectedFileName: string;
  thirdformError = false;
  errors = new Array();
  legalOwnerName: string;
  legalBuinessName: string;
  legalRegNumber: string;
  legalFile: string;
  add_edit_type: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private authenticateService: AuthenticationService
  ) {
    this.store_id = this.route.snapshot.paramMap.get('store-id');
    this.add_edit_type = this.route.snapshot.queryParams['type'] || '';
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if (localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')) {
      obj.getownershipform();
      // obj.authenticateService.checkExpiryStatus();
    }
    this.ownershipform = this.formBuilder.group({
      ownerName: ['', Validators.required],
      businessName: ['', Validators.required],
      ABNnumber: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      // file:['', Validators.required],
      checkownership: [false, Validators.requiredTrue],
    });
  }

  get f() { return this.ownershipform.controls; }

  ownerShip() {
    this.ownernameSubmit = true;
    this.businessnameSubmit = true;
    this.ABNnumberSubmit = true;
    this.checkownershipSubmit = true;
    // this.fileSubmit = true;
    if (this.ownershipform.invalid) {
      return;
    }
    if(!this.legalFile && !this.selectedFile) return;
    this.alertservice.showLoader();
    if (this.legalFile) {
      let data = {
        'legal_owner_name': this.ownershipform.value.ownerName,
        'legal_business_name': this.ownershipform.value.businessName,
        'business_register_number': this.ownershipform.value.ABNnumber,
        'certificate_of_registration': this.legalFile
      };
      this.saveStore(data);
    } else {
      let form_data = new FormData();
      form_data.append('document', this.selectedFile, this.selectedFile.name);
      this.restApiservice.pushSaveFileToStorageWithFormdata(form_data, 'store/update/' + this.store_id + '/file/upload', (response) => {
        if (response && response['success'] && response['data']) {
          let certificate = response['data'];
          let data = {
            'legal_owner_name': this.ownershipform.value.ownerName,
            'legal_business_name': this.ownershipform.value.businessName,
            'business_register_number': this.ownershipform.value.ABNnumber,
            'certificate_of_registration': certificate
          };
          this.alertservice.showLoader();
          this.saveStore(data)
        }
      });
    }

  }

  saveStore(data) {
    this.restApiservice.putAPI('store/update/' + this.store_id + '/ownership-proof', data, (response) => {
      if (response && response['success'] && response['data']) {
        this.alertservice.hideLoader();
        // console.log('success');
        // console.log('/store/step3/'+response['data']['store_id']+'/'+response['data']['next_step']);
        return this.router.navigateByUrl('/store/step3/' + response['data']['store_id'] + '/' + response['data']['next_step']);
      } else if (response && !response['success'] && response['error']['error']) {
        let i = 0;
        for (let key in response['error']['error']) {
          this.thirdformError = true;
          this.errors[key] = response['error']['error'][key][0];
          this.alertservice.showNotification(this.errors[key], 'error');
        }
      } else {
        this.alertservice.showNotification('Something went wrong', 'error');
      }
      this.alertservice.hideLoader();
    });
  }

  backTostore() {
    this.alertservice.showLoader();
    this.restApiservice.getData('store/details/step1/' + this.store_id + '', (response) => {
      if (response && response['success'] && response['data']) {
        this.alertservice.hideLoader();
        return this.router.navigateByUrl('/store/step1/' + this.store_id + '?type=edit');
      } else if (response && !response['success'] && response['error']['error']) {
        let i = 0;
        for (let key in response['error']['error']) {
          this.thirdformError = true;
          this.errors[key] = response['error']['error'][key][0];
          this.alertservice.showNotification(this.errors[key], 'error');
        }
      } else {
        this.alertservice.showNotification('Something went wrong', 'error');
      }
      this.alertservice.hideLoader();
    });
  }

  getownershipform() {
    // this.alertservice.showLoader();
    this.restApiservice.getData('store/details/step2/' + this.store_id + '', (response) => {
      if (response && response['success'] && response['data']) {
        response['data'].forEach(element => {
          this.legalOwnerName = element.legal_owner_name;
          this.legalBuinessName = element.legal_business_name;
          this.legalRegNumber = element.business_register_number;
          this.legalFile = element.certificate_of_registration;
          this.ownershipform.get('ownerName').setValue(this.legalOwnerName);
          this.ownershipform.get('businessName').setValue(this.legalBuinessName);
          this.ownershipform.get('ABNnumber').setValue(this.legalRegNumber);
          // this.ownershipform.get('certificate').setValue(this.legalFile);
          // this.alertservice.hideLoader();
        })
      }
    });
  }

  /* File upload Required function */
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
      this.legalFile = '';
    }
  }

}
