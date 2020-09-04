import { Component, OnInit } from '@angular/core';
import { AdminStoreDataService } from '../../_services/admin-store-data.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-store-shell',
  templateUrl: './store-shell.component.html',
  styleUrls: ['./store-shell.component.scss']
})
export class StoreShellComponent implements OnInit {
  contentLoaded: boolean = false;
  stores$ : Observable<{store_id: number, store_name: string, status: string}>;

  constructor(private adminStoreData: AdminStoreDataService) { }

  ngOnInit(): void {
    this.stores$ = this.adminStoreData.storeShellAllStores().pipe(finalize(() => this.contentLoaded = true));
  }

}
