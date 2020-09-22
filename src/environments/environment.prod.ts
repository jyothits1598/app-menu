export const environment = {
  production: true,

  // UAT server APIs

  // mail_url_success:'https://uat.menuzapp.com.au/email-verify',
  // mail_url_failure:'https://uat.menuzapp.com.au/email-token-expired',
  // mail_url_login:'https://uat.menuzapp.com.au/login',
  // mail_url_contactus:'https://uat.menuzapp.com.au/page-under-progress'

  // test server APIs

  mail_url_success:'http://54.252.119.115/email-verify',
  mail_url_failure:'http://54.252.119.115/email-token-expired',
  mail_url_login:'http://54.252.119.115/login',
  mail_url_contactus:'http://54.252.119.115/page-under-progress'

};

// test server APIs
//export const API_URL_LINK = 'http://3.7.155.134:81/';

 // UAT server APIs
// export const API_URL_LINK = 'https://uat.api.menuzapp.com/';

export const API_URL_LINK = 'http://54.252.119.115:8000/';

export const REQUEST_A_ACTIVE = 'http://54.252.119.115/login';
 
// export const REQUEST_A_ACTIVE = 'https://uat.menuzapp.com.au/email-verify';