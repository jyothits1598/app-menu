import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';

import { filter, catchError } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { StoreMenu } from 'src/app/_models/store-menu';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { StringHelperService } from 'src/app/services/string-helper.service';

@Component({
  selector: 'app-restaurant-menu-items',
  templateUrl: './restaurant-menu-items.component.html',
  styleUrls: ['./restaurant-menu-items.component.scss']
})
export class RestaurantMenuItemsComponent implements OnInit {
  deleteIndexlist: number;
  items = new Array<StoreMenuItem>();
  item_id: string;
  item_name: string;
  constructor(
    private _modalService: NgbModal,
    public route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private restApiService: RestApiService,
    private alertService: AlertService,
    public stringHelper: StringHelperService
  ) {

  }

  nameAccessor: (any) => string = (data) => data.name;

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.items = [];
    if (!this.storeService.activeStore) { 
      return this.router.navigate(['../notfound'], { relativeTo: this.route });
    }
    // this.alertService.showLoader();
    this.restApiService.getData(`store/items/get/${this.storeService.activeStore}/all`, (response) => {
      if (response['data'] && response['data'].length > 0) {
        let data = response['data'];
        data.forEach(item => {
          this.items.push(this.readItems(item));
          this.alertService.hideLoader();
        });
      }
    });
  }

  deleteData() {
    let menuItems = this.items[this.deleteIndexlist];

    let data: any = {};
    data.item_id = menuItems.id;
    data.item_name = menuItems.name;
    data.active_flag = 0;

    this.restApiService.postAPI(`store/items/add/${this.storeService.activeStore}`
      , data
      , (resp) => {
        if (resp.success) {
          this.alertService.showNotification('Items deleted.', 'success');
          this.fetchItems();
          this.items.splice(this.deleteIndexlist, 1);
        }
      }
      , (err) => {
        this.alertService.showNotification('There was an error while deleting the item, please try again.', 'error');
      })
  }

  readItems(data: any): StoreMenuItem {
    let cats = new Array<StoreMenuCategory>();
    data.category_details.forEach(cat => {
      cats.push(new StoreMenuCategory(cat.category_id, cat.category_name, null))
    });
    let menus = new Array<StoreMenu>();
    data.menu_details.forEach(menu => {
      menus.push(new StoreMenu(menu.menu_id, menu.menu_name, menu.is_custom_availability, null))
    });
    let mods = new Array<StoreMenuModifier>();
    data.modifiers_details.forEach(mod => {
      mods.push(new StoreMenuModifier(mod.modifier_id, mod.modifier_name))
    });
    return new StoreMenuItem(data.item_id, data.item_name, data.item_base_price, cats, menus, mods);
  }

  get modalService(): NgbModal {
    return this._modalService;
  }

}
