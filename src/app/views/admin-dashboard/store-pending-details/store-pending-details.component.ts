import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Store, ReadStore } from 'src/app/_models/store';
import { URL_StoreDetail, URL_ApproveStore } from 'src/environments/api/api-store-administration';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StringHelperService } from 'src/app/services/string-helper.service';

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
  loadingApproval: boolean = false;

  constructor(private restApiService: RestApiService,
    private route: ActivatedRoute,
    private stringHelper: StringHelperService) {
    this.routerSubs = this.route.params.subscribe(params => {
      this.storeId = +params['id'];
      if (!this.storeId) {
        // this.router.navigate(['./not-found'], { relativeTo: this.route });
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
    console.log('approve called', storeId);
    this.loadingApproval = true;
    this.restApiService.patchData(URL_ApproveStore(storeId), {}).pipe(
      finalize(() => this.loadingApproval = false)
    ).subscribe(

    )
  }

} 
