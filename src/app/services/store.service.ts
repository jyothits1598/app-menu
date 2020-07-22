import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Store } from '../_models/store';
import { StoreMenuTime } from '../_models/store-menu';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  _stores: Array<any> = [];
  _activeStore: number;

  constructor(private restApiService: RestApiService) { }

  set stores(stores: Array<any>) {
    this._stores = stores;
  }

  set activeStore(storeId: number) {
    this._activeStore = storeId
  }

  get activeStore(): number {
    return this._activeStore;
  }

  getStore() {
    return this._activeStore;
  }

  //fucntion to read availability aquired from the backend
  readAvailability(availability: any): Array<StoreMenuTime> {
    let result: Array<StoreMenuTime> = []
    for (const a in availability) {
      result.push(new StoreMenuTime(
        availability[a].menu_timings_id
        , availability[a].days
        , availability[a].start_time
        , availability[a].end_time
        , availability[a].marked_as_closed ? true : false))
    }
    return result;
  }

}
