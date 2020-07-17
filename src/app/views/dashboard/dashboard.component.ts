import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  returnUrl: string;
  tab_acive=new Array();
  userRole:number;
  active_status = false;
  storename: string;

  constructor(
    private authenticateService: AuthenticationService,
    private dataService: DataService,
    private restapiService: RestApiService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    // this.tab_acive['dashboard']='active';
    // if(this.dataService.hasRoleId()){
    //   this.userRole = this.dataService.hasRoleId();
    // }
   }

  ngOnInit(): void {
    var obj = this;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      // obj.authenticateService.checkExpiryStatus();
    }
    obj.authenticateService.getUserObject().subscribe((response)=>{
      if(response && response['user_details'] && response['user_details']['store_partner_id']){
       console.log(response['user_details']['store_partner_id']);
      }else{
        return obj.router.navigate(['/login']);
      }
    });
  }

  // storeDetail() {
  //   this.alertService.showLoader();
  //   this.restapiService.getData('store/get',(response)=>{
  //     if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length > 0){
  //       response['data'].forEach(element => {
  //         if(element.store_id) {
  //           this.storename = element.store_name;
  //           console.log(this.storename);
  //           if(element['active_flag'] == 0 && element['next_step'] == "") {
  //             this.active_status = true;
  //           } 
  //         }  
  //         this.alertService.hideLoader();
  //       });
        
  //     }
  //   });
  // }
}
