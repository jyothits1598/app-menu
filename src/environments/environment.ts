// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // UAT server APIs

  // mail_url_success:'https://uat.menuzapp.com.au/email-verify',
  // mail_url_failure:'https://uat.menuzapp.com.au/email-token-expired',
  // mail_url_login:'https://uat.menuzapp.com.au/login',
  // mail_url_contactus:'https://uat.menuzapp.com.au/page-under-progress'

  // test server APIs

  mail_url_success:'http://54.252.119.115:8000/email-verify',
  mail_url_failure:'http://54.252.119.115:8000/email-token-expired',
  mail_url_login:'http://54.252.119.115:8000/login',
  mail_url_contactus:'http://54.252.119.115:8000/page-under-progress'

};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// export const API_URL_LINK = 'https://uat.api.menuzapp.com/';

export const API_URL_LINK = 'http://54.252.119.115:8000/';

export const REQUEST_A_ACTIVE = 'http://54.252.119.115/login';

// export const REQUEST_A_ACTIVE = 'https://uat.menuzapp.com.au/email-verify';
