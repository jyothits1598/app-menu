import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-fifth-forms',
  templateUrl: './fifth-forms.component.html',
  styleUrls: ['./fifth-forms.component.scss']
})
export class FifthFormsComponent implements OnInit {
  store_id:string;
  storename: string;
  active_status = false;
  returnUrl: string;

  constructor(
    private restapiService: RestApiService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private authenticateService: AuthenticationService
  ) { 
    this.store_id = this.route.snapshot.paramMap.get('store-id');
    
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    var obj = this;
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      obj.authenticateService.checkExpiryStatus();
    }
  }

  storeDetail() {
    this.alertService.showLoader();
    this.restapiService.getData('store/get',(response)=>{
      if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length > 0){
        response['data'].forEach(element => {
          if(element.store_id) {
            this.storename = element.store_name;
            if(element['active_flag'] == 0 && element['next_step'] == "") {
              return this.router.navigateByUrl('/pending-approval');              
            } else if(element['active_flag'] == 1) {
              return this.router.navigateByUrl('/approval');
            } 
            // else if(element['active_flag'] == 0 && element['next_step']) {
            //   return this.router.navigateByUrl('/')
            // }
          }  
          this.alertService.hideLoader();
        });       
      }
    });
  }

}
