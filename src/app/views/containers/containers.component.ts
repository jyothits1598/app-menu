import { Component, OnInit } from '@angular/core';
declare let $: any;
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {
  private unsubscribe$ = new Subject();
  dashboard_url:string = "/dashboard";
  menu_url:string = "/stores/";
  menu_image:string = "assets/images/ico_menu.png";
  close_image:string = "assets/images/alert-close.png";

  // dashboard_status:boolean = false;
  // menu_status:boolean = false;

  constructor(
    private router:Router,
    public layoutService: LayoutService
  ) {  
    // this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(
    //   (event: any) => {
    //     if (event instanceof NavigationEnd) {
    //       this.dashboard_status = false;
    //       this.menu_status = false;

    //       if(this.router.url && this.router.url.indexOf(this.dashboard_url) > -1){
    //         this.dashboard_status = true;
    //       }else if(this.router.url && this.router.url.indexOf(this.menu_url) > -1){
    //         this.menu_status = true;
    //       }
    //     }
    //   }
    // );
  }

  ngOnInit(): void {  
  }

/*
  * default Angular Destroy Method
  */
 ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

}
