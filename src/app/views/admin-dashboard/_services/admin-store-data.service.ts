import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { URL_ImportStoreShell, URL_StoreShellAllStores } from 'src/environments/api/api-store-administration';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AdminStoreDataService {

  constructor(private restApiService: RestApiService) { }

  storeShellAllStores(): Observable<{ store_id: number, store_name: string, status: string }> {
    return this.restApiService.getDataObs(URL_StoreShellAllStores).pipe(map((resp: any) => resp.data))
  }

  importCSV(file: File): Observable<boolean> {
    let formData = new FormData();
    formData.append('stores', file);
    return this.restApiService.postData(URL_ImportStoreShell, formData).pipe(map((resp: any) => {
      if (resp && resp.success) return true
      else throwError('Could not complete impoting');
    }))
  }

}
