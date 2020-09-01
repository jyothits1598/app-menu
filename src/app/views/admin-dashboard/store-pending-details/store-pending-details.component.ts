import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Store, ReadStore } from 'src/app/_models/store';
import { URL_StoreDetail, URL_ApproveStore, URL_RejectStore } from 'src/environments/api/api-store-administration';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { AlertService } from 'src/app/services/alert.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-store-pending-details',
  templateUrl: './store-pending-details.component.html',
  styleUrls: ['./store-pending-details.component.scss']
})
export class StorePendingDetailsComponent implements OnInit {
  // data
  storeId: number;
  approvalData: {
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: string,
    store_partner_id: number,
    legal_owner_name: string,
    legal_business_name: string,
    business_register_number: string,
    certificate_of_registration: string,
    fileName: string
  };

  
  // other
  routerSubs: Subscription;
  approvalStatus: boolean = false;
  denialStatus: boolean = false;

  constructor(private restApiService: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private stringHelper: StringHelperService,
    private alertService: AlertService) {
    this.routerSubs = this.route.params.subscribe(params => {
      this.storeId = +params['id'];
      if (!this.storeId) {
      } else this.fetchData();
    })
  }

  ngOnInit(): void {
  }

  fetchData() {
    this.restApiService.getDataObs(URL_StoreDetail(this.storeId)).subscribe(
      (resp) => {
        if (resp && resp.data) {
          this.approvalData = resp.data;
          this.approvalData.fileName = this.stringHelper.ExtractFileName(this.approvalData.certificate_of_registration);
        }
      }
    )
  }

  approveStore(storeId) {
    this.alertService.showLoader();
    this.restApiService.patchData(URL_ApproveStore(storeId), {}).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe(
      (resp : any)=>{
        if(resp && resp.success){
          this.alertService.showNotification('Store Approved', 'success');
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      }
    )
  }

  rejectStore(storeId) {
    this.alertService.showLoader();
    this.restApiService.patchData(URL_RejectStore(storeId), {}).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe(
      (resp : any)=>{
        if(resp && resp.success){
          this.alertService.showNotification('Store Denyed', 'success');
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      }
    )
  }

} 
