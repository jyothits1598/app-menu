import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { REQUEST_A_ACTIVE } from 'src/environments/environment';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirmation-signup',
  templateUrl: './confirmation-signup.component.html',
  styleUrls: ['./confirmation-signup.component.scss']
})
export class ConfirmationSignupComponent implements OnInit {
  emailAddress: string;
  returnUrl: string;
  resendSignupEmail: FormGroup;
  resendemailSubmit = false;
  ResendemailError = false;
  errors = new Array();
  member_invite_auth_token:string = '';
  member_invite_email_token:string = '';
  member_invite_store_token:string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private authenticateService: AuthenticationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.member_invite_auth_token = params['member_auth_token'];
      this.member_invite_email_token = params['member_email_token'];
      this.member_invite_store_token = params['store_token'];
    });
   }

  ngOnInit(): void {
    let Email=localStorage.getItem("email");
    this.emailAddress= Email;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      this.router.navigateByUrl('/dashboard');
      //obj.authenticateService.checkExpiryStatus();
    }
    // this.resendSignupEmail = this.formBuilder.group({
    //   resendemail: [null, [Validators.required, Validators.email]],
    // });
  }
  // get f() { return this.resendSignupEmail.controls;}

  // resendEmail() {
  //   this.resendemailSubmit = true;
  //   if (this.resendSignupEmail.invalid) {
  //     return;
  //   }
  // if(this.member_invite_auth_token && this.member_invite_email_token && this.member_invite_store_token){
  //   member_invite_link = 'member_auth_token='+this.member_invite_auth_token+'&member_email_token='+this.member_invite_email_token+'&store_token='+this.member_invite_store_token;
  //  }
  //   if(this.resendSignupEmail.valid){
  //     let data={
  //       'email':this.resendSignupEmail.value.resendemail,
  //       'success_redirect':environment['mail_url_success'],
  //       'failure_redirect':environment['mail_url_failure'],
  //       'login_link':environment['mail_url_login'],
  //       'contactus_link':environment['mail_url_contactus'],
  //        'member_invite_link':member_invite_link
  //     }; 
  //     this.alertservice.showLoader();
  //     this.restApiservice.postAPI('resend/partner/confirm-email',data,(response)=>{
  //       if(response && response['success'] && response['data']){
  //         this.alertservice.showAlertBottomNotification('Successfully sent mail. Please check your mailbox');
  //         this.alertservice.hideLoader();
  //       } else if(response && !response['success'] && response['error']['error']) { 
  //         let i=0;
  //           for(let key in response['error']['error']) {
  //             this.ResendemailError = true;
  //             this.errors[key]=response['error']['error'][key][0];
  //             this.alertservice.showNotification(this.errors[key],'error');
  //           }
  //       } else {
  //         this.alertservice.showNotification('Something went wrong','error');
  //       }
  //       this.alertservice.hideLoader();
  //     });
  //   } else {
  //     this.alertservice.showNotification('Something went wrong','error');
  //     this.alertservice.hideLoader();
  //   }
  // }
}
