import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { empty } from 'rxjs/internal/observable/empty';
import { catchError, finalize, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SearchQueryGeneratorComponent } from 'src/app/views/shared/components/search-query-generator/search-query-generator.component';
import { ModalService } from 'src/app/views/shared/services/modal.service';
import { UserRole } from 'src/app/_models/user';
import { URL_AdminApprovedStores } from 'src/environments/api-endpoint';
import { AdminStoreDataService } from '../../_services/admin-store-data.service';

@Component({
  selector: 'app-store-approved-list',
  templateUrl: './store-approved-list.component.html',
  styleUrls: ['./store-approved-list.component.scss']
})
export class StoreApprovedListComponent implements OnInit, AfterViewInit, OnDestroy {

  approvedStores: Array<{ id: number, name: string, status: string, applicant: string }>;
  isAdmin: boolean = false;
  constructor(private adminStoreData: AdminStoreDataService,
    private alertService: AlertService,
    private modalService: ModalService,
    private authService: AuthenticationService) { }

  @ViewChild('queryGen', { read: SearchQueryGeneratorComponent }) queryGen: SearchQueryGeneratorComponent
  querySubs: Subscription;

  ngOnInit(): void {
    this.authService.getUserObject().pipe(take(1)).subscribe(user => { if (user.role === UserRole.Admin) this.isAdmin = true });
    this.adminStoreData.allApprovedStores().subscribe(stores => this.approvedStores = stores);
  }

  ngAfterViewInit(): void {
    this.querySubs = this.queryGen.query.pipe(
      tap(change => this.approvedStores = null),
      switchMap((val) => this.adminStoreData.allApprovedStores(val))).subscribe(stores => this.approvedStores = stores);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  deleteStore(index: number) {
    this.modalService.getConfirmation({
      heading: 'Deleting store',
      dialog: 'Are you sure?',
      confirmBtn: 'Delete',
      declineBtn: 'Cancel'
    }).pipe(
      catchError(() => empty()),
      tap(() => { this.alertService.showLoader() }),
      mergeMap(() => this.adminStoreData.deleteStore(this.approvedStores[index].id)),
      finalize(() => { this.alertService.hideLoader() })
    ).subscribe(
      () => { this.alertService.showNotification('Store successfully deleted'); this.approvedStores.splice(index, 1); },
      // (errorResp) => { this.alertService.showNotification() }
    )
  }

  
}
