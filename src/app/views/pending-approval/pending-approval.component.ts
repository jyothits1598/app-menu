import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.scss']
})
export class PendingApprovalComponent implements OnInit {
  returnUrl: string;
  storename: string;

  constructor(
    private authenticateService: AuthenticationService,
    private dataService: DataService,
    private restapiService: RestApiService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var obj = this;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      obj.authenticateService.checkExpiryStatus();
    }
    obj.authenticateService.getUserObject().subscribe((response)=>{
      if(response && response['user_details'] && response['user_details']['store_partner_id']){
        obj.storeDetails();
      }else{
        return obj.router.navigate(['/login']);
      }
    });
  }

  storeDetails() {
    this.alertService.showLoader();
    this.restapiService.getData('store/get',(response)=>{
      if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length > 0){
        response['data'].forEach(element => {
          if(element.store_id) {
            this.storename = element.store_name;
          }  
          this.alertService.hideLoader();
        });       
      }
    });
  }

}
