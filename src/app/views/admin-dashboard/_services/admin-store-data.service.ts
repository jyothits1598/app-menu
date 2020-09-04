import { Injectable } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { URL_StoreShellAllStores } from 'src/environments/api/api-store-administration';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AdminStoreDataService {

  constructor(private restApiService: RestApiService) { }

  storeShellAllStores(): Observable<{store_id: number, store_name: string, status: string}>{
    return this.restApiService.getDataObs(URL_StoreShellAllStores).pipe(map((resp: any) => resp.data))
  }

}
