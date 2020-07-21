import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Store } from '../_models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  _stores: Array<any> = [];
  _activeStore: number;

  constructor(private restApiService: RestApiService) { }

  set stores(stores: Array<any>){
    this._stores = stores;
  }

  set activeStore(storeId: number){
    this._activeStore = storeId
  }

  get activeStore(): number{
    return this._activeStore;
  }

  getStore(){
    return this._activeStore;
  }
  
}
