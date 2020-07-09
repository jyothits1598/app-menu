import { Component, OnInit } from '@angular/core';
declare let $: any;
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {
  private unsubscribe$ = new Subject();
  constructor(
    private authenticateService: AuthenticationService,
    private restapiService: RestApiService,
    private alertservice: AlertService,
    private router:Router
  ) { }

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
