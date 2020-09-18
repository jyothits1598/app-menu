import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';
import { ModifierOption, StoreMenuModifier, StoreMenuModifierItem } from 'src/app/_models/store-menu-modifier';
import { URL_CreateStoreMenuModfier, URL_StoreMenuModifier } from 'src/environments/api/api-store-menu';

@Injectable({
  providedIn: 'root'
})
export class StoreMenuModifierDataService {

  constructor(private storeService: StoreService,
    private restApiService: RestApiService) { }

  allModifiers(): Observable<Array<StoreMenuModifier>> {
    return this.restApiService.getDataObs(`modifiers/${this.storeService.activeStore$.value.id}/all`).pipe(
      map((resp: any) => {
        let mods: Array<StoreMenuModifier> = [];
        resp.data.forEach(data => {
          mods.push(this.readStoreMenuModifier(data));
        });
        return mods
      })
    )
  }

  modiferDetail(modifierId: number): Observable<StoreMenuModifier> {
    return this.restApiService.getDataObs(URL_StoreMenuModifier(this.storeService.activeStore$.value.id, modifierId)).pipe(map(
      resp => {
        if (resp.data[0]) return this.readStoreMenuModifier(resp.data[0]);
        else throwError('Data not complete');
      }
    ))
  }

  saveModifier(modifier: StoreMenuModifier): Observable<boolean> {
    let data: any = {};
    if (modifier.id) data.modifier_id = modifier.id;
    data.store_id = this.storeService.activeStore$.value.id;
    data.modifier_name = modifier.name;
    data.select_minimum = modifier.minimum;
    data.select_maximum = modifier.maximum;
    data.select_free = modifier.free;
    data.options = [];
    modifier.options.forEach((opt) => {
      let option = { name: opt.name, price: opt.price };
      data.options.push(option);
    })
    return this.restApiService.postData(URL_CreateStoreMenuModfier, data).pipe(map(
      (resp: any) => resp.success
    ))
  }

  readStoreMenuModifier(data: any): StoreMenuModifier {
    let mod = new StoreMenuModifier(data.modifier_id, data.modifier_name);
    mod.maximum = data.select_maximum;
    mod.minimum = data.select_minimum;
    mod.free = data.select_free;
    mod.options = [];
    mod.items = [];
    data.options.forEach(data => mod.options.push(new ModifierOption(data.modifier_option_id, data.name, data.price)));
    data.used_by.forEach(item => {
      let newItem = new StoreMenuItem(item.item_id, item.item_name, null, null, null);
      newItem.categories = [];
      item.categories.forEach(category => {
        newItem.categories.push(new StoreMenuCategory(category.category_id, category.category_name))
      });
      mod.items.push(newItem);
    });
    return mod;
  }

  deleteModifier(modifierId: number) {
    var data: any = {};
    data.modifier_id = modifierId;
    data.store_id = this.storeService.activeStore$.value.id;
    data.active_flag = 0;

    return this.restApiService.postData(URL_CreateStoreMenuModfier, data);
  }
}