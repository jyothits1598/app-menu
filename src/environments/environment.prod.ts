export const environment = {
  production: true,

  /* UAT server APIs */

  // mail_url_success:'https://uat.menuzapp.com.au/partner/email-verify',
  // mail_url_failure:'https://uat.menuzapp.com.au/partner/email-token-expired',
  // mail_url_login:'https://uat.menuzapp.com.au/partner/login',
  // mail_url_contactus:'https://uat.menuzapp.com.au/partner/page-under-progress'

  /* test server APIs */

  mail_url_success:'http://54.252.119.115/partner/email-verify',
  mail_url_failure:'http://54.252.119.115/partner/email-token-expired',
  mail_url_login:'http://54.252.119.115/partner/login',
  mail_url_contactus:'http://54.252.119.115/partner/page-under-progress'

};

  /* UAT server APIs */


// export const API_URL_LINK = 'https://uat.api.menuzapp.com/';
// export const REQUEST_A_ACTIVE = 'https://uat.menuzapp.com.au/partner/login';
// export const REQUEST_RESET_EMAIL = 'https://uat.menuzapp.com.au/partner/reset-password';


/* test server APIs */

export const API_URL_LINK = 'http://54.252.119.115:8000/';
export const REQUEST_A_ACTIVE = 'http://54.252.119.115/partner/login';
export const REQUEST_RESET_EMAIL = 'http://54.252.119.115/partner/reset-password';

