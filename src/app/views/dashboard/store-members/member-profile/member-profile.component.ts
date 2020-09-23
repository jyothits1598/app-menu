import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  deleteIndexlist: number;
  routerSubs: Subscription;
  memberId:number;
  memberProfileDetails:any = {};
  normalMode=true;
  imageUrl:string='';
  constructor(
    private _modalService: NgbModal,
    private restApiService: RestApiService,
    private alertService: AlertService,
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.routerSubs = this.route.params.subscribe(params => {
       this.memberId = +params['id'];
    });
     
   }

  ngOnInit(): void {
    var obj = this;
    obj.getMemberProfileDetails(); 
  }
  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
       
  }

  getMemberProfileDetails(){
    // this.memberProfileDetails = [];
    this.alertService.showLoader();
    this.restApiService.getData(`api/stores/${this.storeService.activeStore}/members/${this.memberId}`, (response) => {
      if (response && response['success'] && response['data']) {
        this.alertService.hideLoader();
        let data = response['data'][0];
        this.memberProfileDetails = data;
      }
    })
  }

  goBack(){
    this.alertService.goBack();
  }
 deleteData() {
    let data: any = {};
    data.active_flag = 2;
    this.alertService.showLoader();
      this.restApiService.patchData(`api/stores/${this.storeService.activeStore}/members/${this.memberId}`, data).pipe(
        finalize(() => this.alertService.hideLoader())
      ).subscribe(
        (resp : any)=>{
          if(resp && resp.success){
            this.alertService.showNotification('Member deleted.','success');
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        }
      )
  }

  get modalService(): NgbModal{
    return this._modalService;
  }
}
