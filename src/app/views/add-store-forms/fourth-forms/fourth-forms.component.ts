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
  selector: 'app-fourth-forms',
  templateUrl: './fourth-forms.component.html',
  styleUrls: ['./fourth-forms.component.scss']
})
export class FourthFormsComponent implements OnInit {
  store_id:string;
  returnUrl: string;
  bankNameSubmit = false;
  accountNameSubmit = false;
  BSBnumberSubmit = false;
  accountNumberSubmit = false;
  checkbankdetailsSubmit = false;
  bankForm: FormGroup;
  fourthformError = false;
  errors = new Array();
  
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
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      obj.authenticateService.checkExpiryStatus();
    }

    this.bankForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      accountName: ['', Validators.required],
      BSBnumber: ['', Validators.required],
      accountNumber: ['', Validators.required],
      checkbankdetails: [false, Validators.requiredTrue],
    });
  }
  get f() { return this.bankForm.controls;}

    bankdetailForm() {
      this.bankNameSubmit = true;
      this.accountNameSubmit = true;
      this.BSBnumberSubmit = true;
      this.accountNumberSubmit = true;
      this.checkbankdetailsSubmit = true;

      if (this.bankForm.invalid) {
        return;
      } 

      if(this.bankForm.valid){
        let data={
          'bank':this.bankForm.value.bankName,
          'bank_account_name':this.bankForm.value.accountName,
          'bsb_number':this.bankForm.value.BSBnumber,
          'bank_account_number':this.bankForm.value.accountNumber
        }; 
        this.alertservice.showLoader();
        this.restApiservice.putAPI('store/update/'+this.store_id+'/bank-account',data,(response)=>{
          if(response && response['success'] && response['data']) {
            console.log('success');
            this.alertservice.hideLoader();
            console.log('/store/step4/'+response['data']['store_id'])
            localStorage.removeItem('storeCreationId');
           return this.router.navigateByUrl('/store/step4/'+response['data']['store_id']);
          } else if(response && !response['success'] && response['message']){
            this.alertservice.showNotification(response['message'],'error');
          }else{
            this.alertservice.showNotification('Something went wrong','error');
          }
          this.alertservice.hideLoader();
        });
      } else {
        this.alertservice.showNotification('Something went wrong','error');
        this.alertservice.hideLoader();
    }

    }

    backOwnership() {
      this.alertservice.showLoader();
      this.restApiservice.getData('store/details/step2/'+this.store_id+'',(response)=> {
        if(response && response['success'] && response['data']) {
          this.alertservice.hideLoader();
          console.log(this.router.navigateByUrl('/store/step2/'+this.store_id+'/'));
          return this.router.navigateByUrl('/store/step2/'+this.store_id+'/ownership-proof');
        } else if(response && !response['success'] && response['error']['error']) { 
          let i=0;
            for(let key in response['error']['error']) {
              this.fourthformError = true;
              this.errors[key]=response['error']['error'][key][0];
              this.alertservice.showNotification(this.errors[key],'error');
            }
        } else {
          this.alertservice.showNotification('Something went wrong','error');
        } 
      });
    }
  }


