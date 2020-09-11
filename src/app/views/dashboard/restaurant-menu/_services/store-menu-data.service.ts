import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { StoreMenuModifier, StoreMenuModifierItem } from 'src/app/_models/store-menu-modifier';

@Injectable({
  providedIn: 'root'
})
export class StoreMenuDataService {

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

  readStoreMenuModifier(data: any): StoreMenuModifier {
    let mod = new StoreMenuModifier(data.modifier_id, data.modifier_name);
    mod.displayText = data.display_text;
    mod.selectionRequired = data.required_selection ? true : false;
    mod.maxItemsSelectable = data.max_items_selected;
    mod.items = [];
    mod.options = [];
    data.item_details.forEach(item => {
      mod.items.push(new StoreMenuModifierItem(item.item_id, item.item_name, item.item_base_price, null, item.modifier_price))
    });
    // data.option.forEach(item => {
    //   mod.items.push(new StoreMenuModifierItem(item.item_id, item.item_name, item.item_base_price, null, item.modifier_price))
    // });
    return mod;
  }

  deleteModifier(modifierId: number) {
    var data: any = {};
    data.modifier_id = modifierId;
    data.store_id = this.storeService.activeStore$.value.id;
    data.active_flag = 0;

    return this.restApiService.postData('modifiers', data);
  }
}