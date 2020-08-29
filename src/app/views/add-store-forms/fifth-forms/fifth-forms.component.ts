import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fifth-forms',
  templateUrl: './fifth-forms.component.html',
  styleUrls: ['./fifth-forms.component.scss']
})
export class FifthFormsComponent implements OnInit {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }

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
