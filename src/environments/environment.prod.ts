export const environment = {
  production: true,

  // UAT server APIs

  mail_url_success:'https://uat.menuzapp.com.au/email-verify',
  mail_url_failure:'https://uat.menuzapp.com.au/email-token-expired',
  mail_url_login:'https://uat.menuzapp.com.au/login',
  mail_url_contactus:'https://uat.menuzapp.com.au/page-under-progress'

  // test server APIs

  // mail_url_success:'http://3.7.155.134:81/#/email-verify',
  // mail_url_failure:'http://3.7.155.134:81/#/email-token-expired',
  // mail_url_login:'http://3.7.155.134:81/#/login',
  // mail_url_contactus:'http://3.7.155.134:81/#/page-under-progress'

};

// test server APIs
//export const API_URL_LINK = 'http://3.7.155.134:81/';

 // UAT server APIs
export const API_URL_LINK = 'https://uat.api.menuzapp.com/';


//export const REQUEST_A_ACTIVE = 'http://localhost:4200/#/email-verify';
 export const REQUEST_A_ACTIVE = 'https://uat.menuzapp.com.au/email-verify';