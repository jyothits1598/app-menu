import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { API_URL_LINK } from '../../environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { User, UserRole } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  userObjectSubject = new BehaviorSubject<User>(this.getOfflineLoggedUserDetails());
  private unsubscribe$ = new Subject();
  errors = new Array();
  SignincodeError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertservice: AlertService,
    private restapiService: RestApiService,
    private dataService: DataService
  ) { }

  roleArray = new Array({
    'partner_role_id': 1
  });
  /*
  * Function to get status of the token 
  * present in local storage
  */
  private hasToken(): boolean {
    return !!localStorage.getItem('Audit_Auth');
  }

  /*
  * Login function to authenticate
  */
  login({ email, password }, returnUrl, member_invite_auth_token, member_invite_email_token, member_invite_store_token) {
    if (email && password) {
      let login_details = {
        "email": email,
        "password": password,
      }
      this.alertservice.showLoader();
      this.http.post(API_URL_LINK + 'signin-partner', login_details).subscribe((token_response: any) => {
        if (token_response && token_response['access_token'] && token_response['user_details']) {


          console.log(token_response);
          console.log('response id details');
          let headers = JSON.stringify({
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token_response['access_token']
          });
          localStorage.setItem('Audit_Auth', headers);
          localStorage.setItem('loggedUser', JSON.stringify(token_response));
          this.isLoginSubject.next(true);
          this.userObjectSubject.next(this.readUser(token_response.user_details));
          let userdata = token_response['user_details'];
          if (userdata['store_partner_id']) {
            this.dataService.changeRoleId(1);
            this.dataService.changeUserId(userdata['store_partner_id']);
            this.dataService.changeUserId(userdata['store_partner_id']);
            if (returnUrl && returnUrl != '/login') {
              this.alertservice.hideLoader();
              return this.router.navigate([returnUrl]);
            }
            this.alertservice.hideLoader();
            console.log('navigating to login');
            if (member_invite_auth_token && member_invite_email_token) {
              return this.router.navigateByUrl('store-invitation?member_auth_token=' + member_invite_auth_token + '&member_email_token=' + member_invite_email_token + '&store_token=' + member_invite_store_token);
            } else {
              return this.router.navigateByUrl('/dashboard');
            }
          } else {
            this.alertservice.hideLoader();
            localStorage.clear();
            this.alertservice.showNotification('Something went wrong, please try again', 'error');
            return this.router.navigate(['/login']);
          }
        }
        this.alertservice.hideLoader();
      }, error => {
        this.alertservice.hideLoader();
        if (error && error.status == 401 || error.status == 400) {
          this.alertservice.showNotification('Email or Password Wrong', 'error');
        } else if (error && error.status == 422) {
          let i = 0;
          for (let key in error['error']['error']) {
            this.SignincodeError = true;
            this.errors[key] = error['error']['error'][key][0];
            this.alertservice.showNotification(this.errors[key], 'error');
          }
        } else {
          this.alertservice.showNotification('Something went wrong', 'error');
        }
        localStorage.clear();
      });
    }
  }

  readUser(data: any): User {
    let user = new User();
    user.email = data.email;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    user.mobileNumber = data.mobile_number;
    user.role = data.role_id;
    return user;
  }


  /*
    * Function to check user login status
    */
  isLoggedIn() {
    return this.isLoginSubject.value;
  }

  /*
    * Logout function clearing all local storage elements
    */
  logout() {
    //call API balance
    this.alertservice.showLoader();
    this.restapiService.postAPI('signout-partner', {}, (response) => {
      if (response && response['data'] && response['success']) {
        this.alertservice.hideLoader();
      }
    });
    localStorage.clear();
    this.isLoginSubject.next(false);
    this.userObjectSubject.next(null);
    return this.router.navigateByUrl('/login');
  }

  /*
  * Function to check user login status
  */
  getUserObject(): Observable<User> {
    return this.userObjectSubject.asObservable();
  }

  /*
    * Function to check expiry status
    */
  checkExpiryStatus() {
    if (localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')) {
      let user_details = JSON.parse(localStorage.getItem('loggedUser'));
      if (user_details && user_details.expires_at) {
        let expiry_date = new Date(user_details.expires_at).getTime();
        let today_date = new Date().getTime();
        if (today_date < expiry_date) {
          this.isLoginSubject.next(true);
          this.userObjectSubject.next(user_details);
          if (user_details && user_details['access_token'] && user_details['store_partner_id']) {
            this.dataService.changeRoleId(1);
            this.dataService.changeUserId(user_details['store_partner_id']);
            if (this.router.url != '/login') {
              return this.router.navigate[this.router.url];
            } else {
              return this.router.navigateByUrl('/dashboard');
            }
          }
        }
      } else {
        localStorage.clear();
      }
    } else {
      localStorage.clear();
    }
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      // const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const regex = new RegExp('^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  /*
   * Function to get logged user details
  */
  getOfflineLoggedUserDetails(): User {
    if (localStorage.getItem('loggedUser')) {
      var user_details = JSON.parse(localStorage.getItem('loggedUser'));
      return this.readUser(user_details.user_details);
    }
    return null;
  }

}
