import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Store } from '../_models/store';
import { StoreMenuTime, StoreMenu } from '../_models/store-menu';
import { StoreMenuCategory } from '../_models/store-menu-category';
import { Observable, BehaviorSubject } from 'rxjs';
import { StoreItem } from './store-item';
import { StoreMenuItem } from '../_models/store-menu-items';
import { TimeAvailabilityModule } from '../_modules/time-availability/time-availability.module';
import { TimeAvailability } from '../_modules/time-availability/_model/time-availability';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  _stores: Array<any> = [];
  _activeStore: number;
  activeStore$: BehaviorSubject<Store> = new BehaviorSubject<Store>(null);
  activeStoreName: string;
  
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
  readAvailability(availability: any): Array<TimeAvailability> {
    let result: Array<TimeAvailability> = []
    for (const a in availability) {
      result.push(new TimeAvailability(
        availability[a].menu_timings_id
        , availability[a].days
        , availability[a].start_time
        , availability[a].end_time
        , availability[a].marked_as_closed ? true : false))
    }
    return result;
  }

  ReadStoreMenuCategory(data: any) : StoreMenuCategory {
    let newStrCat = new StoreMenuCategory(data.category_details.category_id, data.category_details.category_name, null);
    newStrCat.menus = [];
    newStrCat.items = [];
    Object.keys(data.menu_details).forEach(function (key, index) {
      newStrCat.menus.push(new StoreMenu(data.menu_details[key].menu_id, data.menu_details[key].menu_name, data.menu_details[key].is_custom_availability, null))
    });
    Object.keys(data.item_details).forEach(function (key, index) {
      newStrCat.items.push(new StoreMenuItem(data.item_details[key].item_id, data.item_details[key].item_name, null))
    });
    return newStrCat;
  }

}
