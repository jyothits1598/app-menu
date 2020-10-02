import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { AlertService } from 'src/app/services/alert.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  newpasswordSubmit = false;
  confirmpasswordSubmit = false;
  resetpasswordForm: FormGroup;
  errors = new Array();
  auth_token:string;
  token:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticationService,
    private alertservice: AlertService,
    private restApiservice: RestApiService,
    private location: Location
  ) { 
    this.route.queryParams.subscribe(params =>{
      if(params['auth_token'] && params['email_token']){
        this.auth_token = params['auth_token'];
        this.token = params['email_token'];
      }else{
        this.alertservice.showNotification('Something went wrong','error');
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit(){
    if(localStorage.getItem("loggedUser")){
      return this.router.navigate(['/login'])
    }
    this.location.replaceState('/reset-password');
    this.resetpasswordForm = this.formBuilder.group({ 
      newpassword: ['', Validators.compose([Validators.required, this.authenticateService.patternValidator()])],
      confirmpassword: ['', Validators.required]
    },{
      validator: MustMatch('newpassword', 'confirmpassword')
    });

    $(".toggle-password").click(function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    
    // $('.password-content').keyup(function() {
    //   var password = $(this).val();      
    //   if ( password.length < 8 ) {
    //     $('#length').removeClass('valid').addClass('invalid');
    //   } else {
    //     $('#length').removeClass('invalid').addClass('valid');    
    //   }
    //   if ( password.match(/[a-z]/) ) {
    //     $('#small').removeClass('invalid').addClass('valid');
    //   } else {
    //     $('#small').removeClass('valid').addClass('invalid');
    //   }
    //   if ( password.match(/[A-Z]/) ) {
    //     $('#capital').removeClass('invalid').addClass('valid');
    //   } else {
    //     $('#capital').removeClass('valid').addClass('invalid');
    //   }
    // }).focus(function() {
    //     $('#pswd_info').show();
    // })
    //   .blur(function() {
    //       $('#pswd_info').hide();
    // });
  }

  get f() { return this.resetpasswordForm.controls;}

  onsubmitresetForm() {
    if(this.auth_token && this.token){
    this.newpasswordSubmit = true;
    this.confirmpasswordSubmit = true;
    if (this.resetpasswordForm.invalid) {
      return;
    }
    if(this.resetpasswordForm.valid){
      let data={
        'new_password':this.resetpasswordForm.value.newpassword,
        'confirm_new_password': this.resetpasswordForm.value.confirmpassword,
        'auth_token': this.auth_token,
        'email_token': this.token,
      };
      this.alertservice.showLoader();
      this.restApiservice.patchData('api/stores/newpassword', data).pipe(
        finalize(() => this.alertservice.hideLoader())
      ).subscribe(
        (resp : any)=>{
          if(resp && resp.success){
            this.alertservice.showNotification(resp['data'], 'success');
            return this.router.navigateByUrl('/login');
          } else if(resp && !resp.success){
            this.alertservice.showNotification('Something went wrong','error');
          }
        }
      )
    }else{
      this.alertservice.showNotification('Something went wrong','error');
      this.alertservice.hideLoader();
    }
  }else{
    this.alertservice.showNotification('Something went wrong','error');
  }
  }
}
