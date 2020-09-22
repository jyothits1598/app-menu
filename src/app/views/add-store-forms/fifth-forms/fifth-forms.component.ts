import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdminStoreDataService } from '../../admin-dashboard/_services/admin-store-data.service';
import { UserRole } from 'src/app/_models/user';

@Component({
  selector: 'app-fifth-forms',
  templateUrl: './fifth-forms.component.html',
  styleUrls: ['./fifth-forms.component.scss']
})
export class FifthFormsComponent implements OnInit {
  isAdmin: boolean = false;
  store_id: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.store_id = this.route.snapshot.paramMap.get('store-id');
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.userObjectSubject.value.role == UserRole.Admin;
  }

  gotoMenu() {
    return this.router.navigate([`/dashboard/partner/stores/${this.store_id}/menu/menus`]) 
  // storeDetail() {
  //   this.alertService.showLoader();
  //   this.restapiService.getData('store/get',(response)=>{
  //     if(response && response['success'] && response['data'] && Array.isArray(response['data']) && response['data'].length > 0){
  //       response['data'].forEach(element => {
  //         if(element.store_id) {
  //           this.storename = element.store_name;
  //           if(element['active_flag'] == 0 && element['next_step'] == "") {
  //             return this.router.navigateByUrl('/pending-approval');              
  //           } else if(element['active_flag'] == 1) {
  //             return this.router.navigateByUrl('/approval');
  //           } 
  //           // else if(element['active_flag'] == 0 && element['next_step']) {
  //           //   return this.router.navigateByUrl('/')
  //           // }
  //         }  
  //         this.alertService.hideLoader();
  //       });       
  //     }
  //   });
  // }
  }

}
