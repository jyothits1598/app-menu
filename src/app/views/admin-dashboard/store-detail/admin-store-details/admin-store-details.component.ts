import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Store, ReadStore } from 'src/app/_models/store';
import { URL_StoreDetail, URL_ApproveStore, URL_RejectStore } from 'src/environments/api/api-store-administration';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { AlertService } from 'src/app/services/alert.service';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-admin-store-details',
  templateUrl: './admin-store-details.component.html',
  styleUrls: ['./admin-store-details.component.scss']
})
export class StorePendingDetailsComponent implements OnInit, OnDestroy {
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
  activeStoreSubs: Subscription;
  approvalStatus: boolean = false;
  denialStatus: boolean = false;

  constructor(private restApiService: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private stringHelper: StringHelperService,
    private alertService: AlertService,
    private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.activeStoreSubs = this.storeService.activeStore$.subscribe(store => this.fetchData());
  }

  fetchData() {
    this.restApiService.getDataObs(URL_StoreDetail(this.storeService.activeStore$.value.id)).subscribe(
      (resp) => {
        if (resp && resp.data) {
          this.approvalData = resp.data;
          this.approvalData.fileName = this.stringHelper.ExtractFileName(this.approvalData.certificate_of_registration);
        }
      }
    )
  }

  approveStore() {
    this.alertService.showLoader();
    this.restApiService.patchData(URL_ApproveStore(this.storeService.activeStore$.value.id), {}).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe(
      (resp: any) => {
        this.alertService.showNotification('Store Approved', 'success');
        this.router.navigate(['../../../'], { relativeTo: this.route });
      }
    )
  }

  rejectStore() {
    this.alertService.showLoader();
    this.restApiService.patchData(URL_RejectStore(this.storeService.activeStore$.value.id), {}).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe(
      (resp: any) => {
        if (resp && resp.success) {
          this.alertService.showNotification('Store Denyed', 'success');
          this.router.navigate(['../../../'], { relativeTo: this.route });
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.activeStoreSubs.unsubscribe();
  }
} 
