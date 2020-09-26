import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { REQUEST_A_ACTIVE } from 'src/environments/environment';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare let $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private unsubscribe$ = new Subject();
  signupMenuzappform: FormGroup;
  fnameSubmit = false;
  lnameSubmit = false;
  emailSubmit = false;
  mobileSubmit = false;
  passwordSubmit = false;
  returnUrl: string;
  errors = new Array();
  SignupcodeError = false;
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
    private authenticateService: AuthenticationService,
    
  ) { 
    this.route.queryParams.subscribe(params => {
      this.member_invite_auth_token = params['member_auth_token'];
      this.member_invite_email_token = params['member_email_token'];
      this.member_invite_store_token = params['store_token'];
    });
  }
    
  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      this.router.navigateByUrl('/dashboard');
      //obj.authenticateService.checkExpiryStatus();
    }
    this.signupMenuzappform = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      signupemail: [null, [Validators.required, Validators.email]],
      signupmobile:['', [Validators.required, Validators.pattern("^((\\+61-?)|0)?[0-9]{10}$")] ],
      // password: ['', [Validators.required,Validators.minLength(8)]],
      password: ['', Validators.compose([Validators.required, this.authenticateService.patternValidator()])],
      // confirmPassword: ['', Validators.required]
    }
    // , {
    //   validator: MustMatch('password', 'confirmPassword')
    // }
    );

    $(".toggle-password").click(function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

    $('input[type=password]').keyup(function() {
      var password = $(this).val();      
      if ( password.length < 8 ) {
        $('#length').removeClass('valid').addClass('invalid');
      } else {
        $('#length').removeClass('invalid').addClass('valid');    
      }
      if ( password.match(/[a-z]/) ) {
        $('#small').removeClass('invalid').addClass('valid');
      } else {
        $('#small').removeClass('valid').addClass('invalid');
      }
      if ( password.match(/[A-Z]/) ) {
        $('#capital').removeClass('invalid').addClass('valid');
      } else {
        $('#capital').removeClass('valid').addClass('invalid');
      }
    }).focus(function() {
        $('#pswd_info').show();
    })
      .blur(function() {
          $('#pswd_info').hide();
    });
}
  
  get f() { return this.signupMenuzappform.controls;}

  menuzappSignup() {
    this.fnameSubmit = true;
    this.lnameSubmit = true;
    this.emailSubmit = true;
    this.mobileSubmit = true;
    this.passwordSubmit = true;
    let member_invite_link;
    if(this.member_invite_auth_token && this.member_invite_email_token && this.member_invite_store_token){
      member_invite_link = 'auth_token='+this.member_invite_auth_token+'&email_token='+this.member_invite_email_token+'&store_token='+this.member_invite_store_token;
     }
    if (this.signupMenuzappform.invalid) {
      return;
    }
    
    
    if(this.signupMenuzappform.valid){
      let data={
        'first_name':this.signupMenuzappform.value.fname,
        'last_name':this.signupMenuzappform.value.lname,
        'email':this.signupMenuzappform.value.signupemail,
        'mobile_number':this.signupMenuzappform.value.signupmobile,
        'password':this.signupMenuzappform.value.password,
        // 'confirm_password':this.signupMenuzappform.value.password,
        'success_redirect':environment['mail_url_success']+'?'+member_invite_link,
        'failure_redirect':environment['mail_url_failure'],
        'login_link':environment['mail_url_login'],
        'contactus_link':environment['mail_url_contactus'],
       }; 
      this.alertservice.showLoader();
      this.restApiservice.postAPI('signup-partner',data,(response)=>{
        if(response && response['success'] && response['data']){         
          localStorage.setItem('email', this.signupMenuzappform.value.signupemail);
          this.alertservice.hideLoader();
          return this.router.navigateByUrl('/confirm-singup?'+member_invite_link);
        } else if(response && !response['success'] && response['error']['error']) {
          let i = 0;
            for(let key in response['error']['error']) {
              this.SignupcodeError = true;
              this.errors[key]= response['error']['error'][key][0];
              this.alertservice.showNotification(this.errors[key],'error');
            }
        } else {
          this.alertservice.showNotification('Something went wrong','error');
        }
        this.alertservice.hideLoader();
      });
    } else {
      this.alertservice.showNotification('Something went wrong','error');
      this.alertservice.hideLoader();
    }
  }
}

// export function spaceValidator(control: AbstractControl) {
//   if (control && control.value && !control.value.replace(/\s/g, '').length) {
//       control.setValue('');
//       return { required: true }
//    }
//     else {
//         return null;
//     }
//   }