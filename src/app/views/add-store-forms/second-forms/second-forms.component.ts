import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  returnUrl: string;
  store_id:string;
  storename:string;
  storeAddress :string;
  cuisine:string;
  getDescription :string;
  store_add_or_edit_action_type:string;
  add_edit_type:string = 'add';

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
    this.add_edit_type = this.route.snapshot.queryParams['type'] || 'add';
  }

  Cuisines: any = ['African: Ethiopian', 'African: other', 'Alcohol', 'American', 'New York', 'Asian fusion', 'Asian: other', 'BBQ', 'Bakery']

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      obj.authenticateService.checkExpiryStatus();
      obj.getstoreDetails();
    }
    this.storeDetailform = this.formBuilder.group({
      storeName: ['', Validators.required],
      storeAddress: ['', Validators.required],
      typeCuisine: ['', Validators.required],
      descriptionItem: ['', Validators.required],
    });
  }

  get f() { return this.storeDetailform.controls;}

  storeDetails() {
    this.storeNameSubmit = true;
    this.storeAddressSubmit = true;
    this.typeCuisineSubmit = true;
    this.descriptionItemSubmit = true;

    if (this.storeDetailform.invalid) {
      return;
    }

    if(this.storeDetailform.valid){
      let data={
        'store_name':this.storeDetailform.value.storeName,
        'store_address':this.storeDetailform.value.storeAddress,
        'type_of_cuisine':this.storeDetailform.value.typeCuisine,
        'description':this.storeDetailform.value.descriptionItem
      }; 
      if(this.add_edit_type=='add') { 
      this.alertservice.showLoader();
      this.restApiservice.postAPI('store/add',data,(response)=>{
        if(response && response['success'] && response['data']) {
          this.alertservice.hideLoader();
          // console.log('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step'])
         return this.router.navigateByUrl('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step']);
        } else if(response && !response['success'] && response['message']){
          this.alertservice.showNotification(response['message'],'error');
        }else{
          this.alertservice.showNotification('Something went wrong','error');
        }
        this.alertservice.hideLoader();
      });
    } 
    else if(this.add_edit_type=='edit'){
      this.alertservice.showLoader();
        this.restApiservice.postAPI('store/update/'+this.store_id+'',data,(response)=>{
          if(response && response['success'] && response['data']) {
            console.log(response);
            this.alertservice.hideLoader();
            console.log('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step'])
           return this.router.navigateByUrl('/store/step2/'+response['data']['store_id']+'/'+response['data']['next_step']);
          }
      });
    }
  } else {
    this.alertservice.showNotification('Something went wrong','error');
    this.alertservice.hideLoader();
  }

  }

  getstoreDetails() {
    // this.alertservice.showLoader();
      this.restApiservice.getData('store/details/step1/'+this.store_id+'',(response)=> {
        if(response && response['success'] && response['data']) {
          response['data'].forEach(element => { 
            this.storename = element.store_name;
            this.storeAddress = element.store_address;
            this.cuisine = element.type_of_cuisine;
            this.getDescription = element.description;
            this.storeDetailform.get('storeName').setValue(this.storename);
            this.storeDetailform.get('storeAddress').setValue(this.storeAddress);
            this.storeDetailform.get('typeCuisine').setValue(this.cuisine);
            this.storeDetailform.get('descriptionItem').setValue(this.getDescription);
            this.alertservice.hideLoader();
          })
        }

      });
  }
  


  changeCuisine() {
    let typeCuisine = this.storeDetailform.value.typeCuisine;
  }

  
   
}
