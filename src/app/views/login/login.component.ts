import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject();
  returnUrl: string;
  email:string;
  message:string;
  password:string;
  email_error:boolean= false;
  password_error:boolean= false;
  showNotificationMessage:string = '';
  notification_color:any = 'red';
  showNotificationStatus = false;
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private authenticateService: AuthenticationService
  ) { 
    // this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    // if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
    //   this.router.navigateByUrl('/dashboard');
    //   //obj.authenticateService.checkExpiryStatus();
    // }
    this.alertservice.getNotification().subscribe(({message:message,alertType:alertType})=>{
      this.showNotificationMessage='';
      if(message){
          if(alertType=='error'){
              this.notification_color = 'red';
          }
          this.showNotificationMessage= message;
          this.showNotificationStatus = true;
          setTimeout(()=>{this.showNotificationStatus = false; }, 5000)
      }else{
        this.showNotificationStatus = false;
      }
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
  }


  /*
  *  Login form
  */
 login(form: NgForm){
  if(localStorage.getItem('Audit_Auth') && localStorage.getItem('expire_time')){
    this.authenticateService.checkExpiryStatus();
  }
  var email_pattern=new RegExp('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}');
  if(this.email && this.email.trim() && email_pattern.test(this.email.trim()) && this.password && this.password.trim()){
    this.authenticateService.login({email:this.email.trim(), password: this.password.trim()}, this.returnUrl);
  }else{
    !this.email ? this.email_error=true : this.email_error= false;
    !email_pattern.test(this.email) ? this.email_error=true : this.email_error= false;
    !this.password ? this.password_error=true : this.password_error= false
  }
}
/*
  * default Angular Destroy Method
  */
 ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

}
