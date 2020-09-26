import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REQUEST_RESET_EMAIL } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  errors = new Array();
  forgotpasswordForm: FormGroup;
  emailSubmit= false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restApiservice: RestApiService,
    private alertservice: AlertService,
  ) { }

  ngOnInit(): void {
    this.forgotpasswordForm = this.formBuilder.group({ 
      requestEmail: [null, [Validators.required, Validators.email]]
    })
  }
  get f() { return this.forgotpasswordForm.controls; }

  onsubmitforgotpasswordForm() {
    this.emailSubmit= true;
    if (this.forgotpasswordForm.invalid) {
      return;
    }
    if(this.forgotpasswordForm.valid){
      let data={
        'email':this.forgotpasswordForm.value.requestEmail,
        'next_url': REQUEST_RESET_EMAIL
      };
      this.alertservice.showLoader();
      this.restApiservice.postAPI('api/stores/forgotpassword',data,(response)=>{
        if(response && response['success'] && response['data']){
          this.alertservice.hideLoader();
          this.alertservice.showNotification(response['data'], 'success');
          return this.router.navigateByUrl('/login');
        }else if(response && !response['success'] && response['error']['error']){
          let i=0;
            for(let key in response['error']['error']) {
              this.errors[key]=response['error']['error'][key][0];
              this.alertservice.showNotification(this.errors[key],'error');
            }
        } else {
          this.alertservice.showNotification('Something went wrong','error');
        }
        this.alertservice.hideLoader();
      }); 
    }else{
      this.alertservice.showNotification('Something went wrong','error');
      this.alertservice.hideLoader();
    }
  }
  
}
