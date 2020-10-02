import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { URL_AdminPendingStores } from 'src/environments/api-endpoint';
import { switchMap, take, tap } from 'rxjs/operators';
import { ModalService } from 'src/app/views/shared/services/modal.service';
import { ConfirmationDialogConfig } from 'src/app/views/shared/_model/confirmation-dialog-config';
import { SearchQueryGeneratorComponent } from 'src/app/views/shared/components/search-query-generator/search-query-generator.component';
import { AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminStoreDataService } from '../../_services/admin-store-data.service';

@Component({
  selector: 'app-store-pending-list',
  templateUrl: './store-pending-list.component.html',
  styleUrls: ['./store-pending-list.component.scss']
})
export class StorePendingListComponent implements OnInit, AfterViewInit, OnDestroy {

  pendingStores: Array<{ id: number, name: string, claimType: string, applicant: string }>;

  @ViewChild('queryGen', { read: SearchQueryGeneratorComponent }) queryGen: SearchQueryGeneratorComponent
  querySubs: Subscription;

  constructor(private restApiService: RestApiService,
    private adminDataServ: AdminStoreDataService) {
  }

  ngAfterViewInit(): void {
    this.querySubs = this.queryGen.query.pipe(
      tap(change => this.pendingStores = null),
      switchMap((val) => this.adminDataServ.allPendingStores(val))).subscribe(stores => this.pendingStores = stores);
  }

  ngOnInit(): void {
    this.adminDataServ.allPendingStores().subscribe(stores => this.pendingStores = stores);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }
}
