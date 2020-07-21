import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-add-store-forms',
  templateUrl: './add-store-forms.component.html',
  styleUrls: ['./add-store-forms.component.scss']
})
export class AddStoreFormsComponent implements OnInit {
  url:string;
  active_image:string = "../../../assets/svg/ico_radio_full.svg";
  inactive_image:string = "../../../assets/svg/ico_radio_blank.svg";
  complete_image:string = "../../../assets/svg/complete_ico.svg";

  first_step_url:string = "/store/first-form";
  second_step_url:string = "/store/step1/create";
  third_step_url:string = "/store/step2/";
  fourth_step_url:string = "/store/step3";
  fifth_step_url:string = "/store/step4";

  first_step_status:boolean = false;
  second_step_status:boolean = false;
  third_step_status:boolean = false;
  fourth_step_status:boolean = false;
  fifth_step_status:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.first_step_status = false;
          this.second_step_status = false;
          this.third_step_status = false;
          this.fourth_step_status = false;
          this.fifth_step_status = false;
          if(this.router.url && this.router.url.indexOf(this.first_step_url) > -1){
            this.first_step_status = true;
          }else if(this.router.url && this.router.url.indexOf(this.second_step_url) > -1){
            this.second_step_status = true;
          }else if(this.router.url && this.router.url.indexOf(this.third_step_url) > -1){
            this.third_step_status = true;
          }else if(this.router.url && this.router.url.indexOf(this.fourth_step_url) > -1){
            this.fourth_step_status = true;
          }else if(this.router.url && this.router.url.indexOf(this.fifth_step_url) > -1){
            this.fifth_step_status = true;
          }
        }
      }
    );
   }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params=>{
    //   console.log(params);
    //   this.id= parseInt(params.get('store-id'));
    //   console.log(this.id);
    // });
  }

}
