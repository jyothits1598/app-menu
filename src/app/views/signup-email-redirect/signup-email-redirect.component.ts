import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-email-redirect',
  templateUrl: './signup-email-redirect.component.html',
  styleUrls: ['./signup-email-redirect.component.scss']
})
export class SignupEmailRedirectComponent implements OnInit {
  member_invite_auth_token:string = '';
  member_invite_email_token:string = '';
  member_invite_store_token:string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.member_invite_auth_token = params['auth_token'];
      this.member_invite_email_token = params['email_token'];
      this.member_invite_store_token = params['store_token'];
  });
   }

  ngOnInit(): void {
  }

  navigateToLogin(){
    if(this.member_invite_auth_token && this.member_invite_email_token && this.member_invite_store_token){
      this.router.navigateByUrl('/login?auth_token='+this.member_invite_auth_token+'&email_token='+this.member_invite_email_token+'&store_token='+this.member_invite_store_token);
    }else{
      this.router.navigateByUrl('/login');
    }
  }
}
