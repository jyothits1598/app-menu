import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { URL_ImportStoreShell, URL_StoreShellAllStores } from 'src/environments/api/api-store-administration';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { URL_AdminApprovedStores, URL_AdminDeleteStore, URL_AdminPendingStores } from 'src/environments/api-endpoint';

@Injectable()
export class AdminStoreDataService {

  constructor(private restApiService: RestApiService) { }

  storeShellAllStores(querystring: string = null): Observable<Array<{ store_id: number, store_name: string, status: string, first_name: string, last_name: string, date: string }>> {
    return this.restApiService.getDataObs(URL_StoreShellAllStores + (querystring ? querystring : '')).pipe(map((resp: any) => resp.data))
  }

  importCSV(file: File): Observable<boolean> {
    let formData = new FormData();
    formData.append('stores', file);
    return this.restApiService.postData(URL_ImportStoreShell, formData).pipe(map((resp: any) => {
      if (resp && resp.success) return true
      else throwError('Could not complete impoting');
    }))
  }

  allPendingStores(queryString: string = null) {
    return this.restApiService.getDataObs(URL_AdminPendingStores + (queryString ? queryString : '')).pipe(map(
      (resp) => {
        let pendingStores = [];
        resp.data.forEach(store => {
          pendingStores.push({ id: store.store_id, name: store.store_name, claimType: store.type_of_creation, applicant: store.legal_owner_name })
        });
        return pendingStores;
      }
    ))
  }

  allApprovedStores(queryString: string = null) {
    return this.restApiService.getDataObs(URL_AdminApprovedStores + (queryString ? queryString : '')).pipe(map(
      (resp) => {
        let approvedStores = [];
        resp.data.forEach(store => {
          approvedStores.push({ id: store.store_id, name: store.store_name, status: store.status, applicant: store.legal_owner_name })
        });
        return approvedStores;
      }
    ))
  }


  deleteStore(storeId: number) {
    return this.restApiService.patchData(URL_AdminDeleteStore, { store_id: storeId });
  }


}
