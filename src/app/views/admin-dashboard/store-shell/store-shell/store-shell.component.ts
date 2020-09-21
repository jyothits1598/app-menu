import { Component, OnInit } from '@angular/core';
import { AdminStoreDataService } from '../../_services/admin-store-data.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileExtentionValidator } from 'src/app/_modules/fileupload/file-validators';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-store-shell',
  templateUrl: './store-shell.component.html',
  styleUrls: ['./store-shell.component.scss']
})
export class StoreShellComponent implements OnInit {
  contentLoaded: boolean = false;
  importComplete: boolean = true;

  stores$: Observable<{ store_id: number, store_name: string, status: string }>;
  validFileFormats = ['.zip'];
  csvFileValidators = [FileExtentionValidator(this.validFileFormats)];

  handleFileUpload(file: File) {
    this.importComplete = false;
    this.adminStoreData.importCSV(file).pipe(
      tap((resp) => {
        this.contentLoaded = false;
        this.stores$ = this.adminStoreData.storeShellAllStores().pipe(finalize(() => this.contentLoaded = true));
      }),
      finalize(() => this.importComplete = true)
    ).subscribe(

    );
  }

  handleFileError(err: string) {
    this.alertService.showNotification(err);
  }

  constructor(private adminStoreData: AdminStoreDataService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.stores$ = this.adminStoreData.storeShellAllStores().pipe(finalize(() => this.contentLoaded = true));
  }

}
