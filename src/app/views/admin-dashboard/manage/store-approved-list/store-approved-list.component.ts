import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SearchQueryGeneratorComponent } from 'src/app/views/shared/components/search-query-generator/search-query-generator.component';
import { URL_AdminApprovedStores } from 'src/environments/api-endpoint';
import { AdminStoreDataService } from '../../_services/admin-store-data.service';

@Component({
  selector: 'app-store-approved-list',
  templateUrl: './store-approved-list.component.html',
  styleUrls: ['./store-approved-list.component.scss']
})
export class StoreApprovedListComponent implements OnInit, AfterViewInit, OnDestroy {

  approvedStores: Array<{ id: number, name: string, status: string, applicant: string }>;
  constructor(private adminStoreData: AdminStoreDataService) { }

  @ViewChild('queryGen', { read: SearchQueryGeneratorComponent }) queryGen: SearchQueryGeneratorComponent
  querySubs: Subscription;

  ngOnInit(): void {
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

}
