import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
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

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
    private authenticateService: AuthenticationService
  ) {}

  // Instead of this method consider using PatternValidator from Angular
  // https://angular.io/api/forms/PatternValidator
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
    if (localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')) {
      this.router.navigateByUrl('/dashboard');
      //obj.authenticateService.checkExpiryStatus();
    }
    this.signupMenuzappform = this.formBuilder.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        signupemail: [null, [Validators.required, Validators.email]],
        signupmobile: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );

    // It is better to avoid the use of jquery in Angular apps. Follow this instead for a better solution
    // https://dev.to/benneee_/creating-a-show-or-hide-password-feature-for-angular-forms-4fdk
    $('.toggle-password').click(function() {
      $(this).toggleClass('fa-eye fa-eye-slash');
      var input = $($(this).attr('toggle'));
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

  get f() {
    return this.signupMenuzappform.controls;
  }

  menuzappSignup() {
    // Instead of using these flags, consider using the Angular's touch and dirty properties
    // https://angular.io/guide/form-validation#validating-input-in-reactive-forms
    this.fnameSubmit = true;
    this.lnameSubmit = true;
    this.emailSubmit = true;
    this.mobileSubmit = true;
    this.passwordSubmit = true;

    if (this.signupMenuzappform.invalid) {
      return;
    }
    if (this.signupMenuzappform.valid) {
      let data = {
        first_name: this.signupMenuzappform.value.fname,
        last_name: this.signupMenuzappform.value.lname,
        email: this.signupMenuzappform.value.signupemail,
        mobile_number: this.signupMenuzappform.value.signupmobile,
        password: this.signupMenuzappform.value.password,
        confirm_password: this.signupMenuzappform.value.password,
        setPasswordURL: REQUEST_A_ACTIVE
      };
      this.alertservice.showLoader();
      this.restApiservice.postAPI('signup-partner', data, response => {
        if (response && response['success'] && response['data']) {
          localStorage.setItem('email', this.signupMenuzappform.value.signupemail);
          // this.alertservice.Success(response['data']);
          this.alertservice.hideLoader();
          return this.router.navigateByUrl('/confirm-singup');
        } else if (response && !response['success'] && response['error']['error']) {
          let i = 0;
          for (let key in response['error']['error']) {
            this.SignupcodeError = true;
            this.errors[key] = response['error']['error'][key][0];
            this.alertservice.showNotification(this.errors[key], 'error');
          }
        } else {
          this.alertservice.showNotification('Something went wrong', 'error');
        }
        this.alertservice.hideLoader();
      });
    } else {
      this.alertservice.showNotification('Something went wrong', 'error');
      this.alertservice.hideLoader();
    }
  }
}
