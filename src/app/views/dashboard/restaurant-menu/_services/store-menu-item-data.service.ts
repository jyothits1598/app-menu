import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  duplicateItem(itemId: number) {
    return this.restApiService.getDataObs(`store/items/get/${this.storeService.activeStore}/${itemId}`).pipe(
      switchMap((resp) => {
        let data = resp.data[0];
        delete data.item_id;
        return this.restApiService.postData(`store/items/add/${this.storeService.activeStore$.value.id}`, data);
      })
    )
  }

}
