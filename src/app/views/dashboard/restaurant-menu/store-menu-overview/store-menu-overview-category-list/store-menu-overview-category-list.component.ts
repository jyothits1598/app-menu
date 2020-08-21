import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreMenu } from 'src/app/_models/store-menu';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CategoryiesWithItemsForMenu } from 'src/environments/api-endpoint';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { map } from 'rxjs/operators';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';
import { StoreMenuService } from 'src/app/services/store-menu.service';
import { StoreService } from 'src/app/services/store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-menu-overview-category-list',
  templateUrl: './store-menu-overview-category-list.component.html',
  styleUrls: ['./store-menu-overview-category-list.component.scss']
})
export class StoreMenuOverviewCategoryListComponent implements OnInit {
  storeId: number;

  constructor(private restApiService: RestApiService,
    private storeMenuService: StoreMenuService,
    private storeService: StoreService,
    private ngbModal: NgbModal) { }

  get modal(): NgbModal {
    return this.ngbModal;
  }
  categories: Array<{ expanded: boolean, category: StoreMenuCategory }>;

  deleteCatIndex: number;
  deleteItemIndex: number;

  ngOnInit(): void {
    this.storeId = this.storeService.activeStore$.value.id;
  }

  fetchCategories(menuId: number) {
    this.categories = null;
    this.restApiService.getDataObs(CategoryiesWithItemsForMenu(menuId)).pipe(
      map((resp) => {
        if (resp.data) {
          this.categories = [];
          let cats: Array<StoreMenuCategory> = [];
          resp.data.forEach(cat => {
            let items = new Array<StoreMenuItem>();
            cat.item_details.forEach(it => {
              items.push(new StoreMenuItem(it.item_id, it.item_name, it.item_base_price, null, null, null))
            });
            cats.push(new StoreMenuCategory(cat.category_id, cat.category_name, null, items))
          });
          return cats;
        }
      })
    ).subscribe(data => data.forEach(element => {
      this.categories.push({ expanded: false, category: element })
    }));
  }

  deleteCategory(category: StoreMenuCategory) {
    this.storeMenuService.DeleteStoreMenuCategory(this.storeId, category.id, category.name).subscribe(
      (resp: any) => {
        if (resp && resp.success) {
          let index = this.categories.findIndex(cat => cat.category === category);
          this.categories.splice(index, 1);
        }
      }
    )
  }

  deleteItem(item: StoreMenuItem) {
    this.storeMenuService.DeleteStoreMenuItem(this.storeId, item.id, item.name).subscribe(
      (resp: any)=>{
        if(resp && resp.data){
          this.categories[this.deleteCatIndex].category.items.splice(this.deleteItemIndex, 1);
        }
      }
    )
  }
}
