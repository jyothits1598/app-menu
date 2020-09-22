import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  routerSubs: Subscription;
  memberId:number;
  memberProfileDetails = new Array();
  normalMode=true;
  constructor(
    private restApiService: RestApiService,
    private alertService: AlertService,
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.routerSubs = this.route.params.subscribe(params => {
       this.memberId = +params['id'];
    });
     this.getMemberProfileDetails()
;    
   }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  getMemberProfileDetails() {
     this.memberProfileDetails = [];
    this.restApiService.getData(`api/stores/${this.storeService.activeStore}/members/${this.memberId}`, (response) => {
      if (response && response['success'] && response['data']) {
        let data = response['data'][0];
        this.memberProfileDetails = data;
      }
    })
  }
}
