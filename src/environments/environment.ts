// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /* UAT server APIs */

  // mail_url_success:'https://uat.menuzapp.com.au/partner/email-verify',
  // mail_url_failure:'https://uat.menuzapp.com.au/partner/email-token-expired',
  // mail_url_login:'https://uat.menuzapp.com.au/partner/login',
  // mail_url_contactus:'https://uat.menuzapp.com.au/partner/page-under-progress'

  /* test server APIs */

  mail_url_success:'http://dev.menuzapp.com/partner/email-verify',
  mail_url_failure:'http://dev.menuzapp.com/partner/email-token-expired',
  mail_url_login:'http://dev.menuzapp.com/partner/login',
  mail_url_contactus:'http://dev.menuzapp.com/partner/page-under-progress'

  // mail_url_success:'http://localhost:4200/email-verify',
  // mail_url_failure:'http://localhost:4200/email-token-expired',
  // mail_url_login:'http://localhost:4200/login',
  // mail_url_contactus:'http://localhost:4200/page-under-progress'

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/* UAT server APIs */
// export const API_URL_LINK = 'https://uat.api.menuzapp.com/';
// export const REQUEST_A_ACTIVE = 'https://uat.menuzapp.com.au/partner/login';
// export const REQUEST_RESET_EMAIL = 'https://uat.menuzapp.com.au/partner/reset-password';



/* test server APIs */
export const API_URL_LINK = 'http://dev.menuzapp.com/api/ApiGateway/public/';
export const REQUEST_A_ACTIVE = 'http://dev.menuzapp.com/partner/login';
export const REQUEST_RESET_EMAIL = 'http://dev.menuzapp.com/partner/reset-password';


// export const REQUEST_A_ACTIVE = 'http://localhost:4200/login';
// export const REQUEST_RESET_EMAIL = 'http://localhost:4200/reset-password';

