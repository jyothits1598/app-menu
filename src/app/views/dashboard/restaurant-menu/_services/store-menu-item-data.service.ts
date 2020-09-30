import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { ReadItems, StoreMenuItem } from 'src/app/_models/store-menu-items';

@Injectable({
  providedIn: 'root'
})
export class StoreMenuItemDataService {

  constructor(private restApiService: RestApiService,
    private storeService: StoreService) { }

  allItems(queryString: string = null): Observable<Array<StoreMenuItem>> {
    return this.restApiService.getDataObs(`store/items/get/${this.storeService.activeStore}/all` + (queryString ? queryString : '')).pipe(map(
      (resp) => {
        let data = resp.data;
        let items = [];
        data.forEach(item => {
          items.push(ReadItems(item));
        });
        return items;
      }
    ));
  }

}
