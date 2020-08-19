import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreMenu } from 'src/app/_models/store-menu';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CategoryiesWithItemsForMenu } from 'src/environments/api-endpoint';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { map } from 'rxjs/operators';
import { StoreItem } from 'src/app/services/store-item';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';

@Component({
  selector: 'app-store-menu-overview-category-list',
  templateUrl: './store-menu-overview-category-list.component.html',
  styleUrls: ['./store-menu-overview-category-list.component.scss']
})
export class StoreMenuOverviewCategoryListComponent implements OnInit{

  constructor(private restApiService: RestApiService) { }

  categories: Array<{ expanded: boolean, category: StoreMenuCategory }>;

  ngOnInit(): void {
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

  debug() {
    console.log(this.categories);
  }

}
