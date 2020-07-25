import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Storedetails } from 'src/app/_models/store-menu';

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
  dasboard_empty:boolean = false;
  mutiple_stores_array: Array<Storedetails> = [];
  store_status:boolean = false;
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
    // this.store_id = this.route.snapshot.paramMap.get('id');
    // console.log(this.store_id);

   }

  ngOnInit(): void {
    var obj = this;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    if(localStorage.getItem('Audit_Auth') && localStorage.getItem('loggedUser')){
      // obj.authenticateService.checkExpiryStatus();
      obj.storeDetail();
    }
    obj.authenticateService.getUserObject().subscribe((response)=>{
      if(response && response['user_details'] && response['user_details']['store_partner_id']){
       console.log(response['user_details']['store_partner_id']);
      }else{
        return obj.router.navigate(['/login']);
      }
    });
  }

  storeDetail() {
    this.mutiple_stores_array = [];
    this.alertService.showLoader();
    this.restapiService.getData('store/get',(response)=>{
      console.log(response);
      if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length > 0){
        let data = response['data'];
        data.forEach(storelist => {
          let newstoreDetails = new Storedetails(storelist.store_id, storelist.store_name, storelist.logo_url ? storelist.logo_url : null);
          this.mutiple_stores_array.push(newstoreDetails);
          if(storelist['active_flag'] == 0) {
            this.store_status = true;
          }
          this.alertService.hideLoader();
        });
        // response['data'].forEach(element => {
        //   if(element.store_id) {
        //     this.storename = element.store_name;
        //     console.log(this.storename);
        //   }  
        //   this.alertService.hideLoader();
        // });
      } else if(response && response['error']['error_msg']){
        this.dasboard_empty = true;
      }
      this.alertService.hideLoader();
    });
  }
}
