import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  storeNames = new Array();
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor(
    private authenticateService: AuthenticationService,
    private dataService: DataService,
    private restapiService: RestApiService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    var obj = this;
    obj.authenticateService.getUserObject().subscribe((response)=>{
      if(response && response['user_details'] && response['user_details']['store_partner_id']){
        // console.log(response['user_details']['store_partner_id']);
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
          this.storeNames = response['data'];
          this.alertService.hideLoader();
        }
      });
    }
   /*
    * Logout function 
    */
  logout(){
    this.authenticateService.logout();
  }

  toggleMenu() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  

}
