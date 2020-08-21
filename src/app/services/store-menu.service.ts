import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { StoreMenuItem } from '../_models/store-menu-items';

@Injectable({
  providedIn: 'root'
})
export class StoreMenuService {

  constructor(private restApiService: RestApiService) { }

  DeleteStoreMenuCategory(storeId: number, categoryId: number, categoryName: string) {
    let data: any = {};
    data.category_id = categoryId;
    data.category_name = categoryName;
    data.active_flag = 0;

    return this.restApiService.postData(`store/category/add/${storeId}`, data);
  }

  DeleteStoreMenuItem(storeId: number, itemId: number, itemName: string) {

    let data: any = {};
    data.item_id = itemId;
    data.item_name = itemName;
    data.active_flag = 0;

    return this.restApiService.postData(`store/items/add/${storeId}`, data);
  }
}
