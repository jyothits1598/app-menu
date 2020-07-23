import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { StoreService } from 'src/app/services/store.service';
import { StoreMenu } from 'src/app/_models/store-menu';

@Component({
  selector: 'app-restaurant-menu-categories',
  templateUrl: './restaurant-menu-categories.component.html',
  styleUrls: ['./restaurant-menu-categories.component.scss']
})
export class RestaurantMenuCategoriesComponent implements OnInit {

  categories: Array<StoreMenuCategory> = [];

  constructor(private restApiService: RestApiService,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.restApiService.getData(`store/category/get/${this.storeService.activeStore}/all`, (response)=>{
      // console.log("response category", response);
      if(response.success && response.data){
        response.data.forEach(data => {
          let newStrCat = new StoreMenuCategory(data.category_details.category_id, data.category_details.category_name, null);
          newStrCat.menus = [];
          Object.keys(data.menu_details).forEach(function(key,index) {
            newStrCat.menus.push(new StoreMenu(data.menu_details[key].menu_id, data.menu_details[key].menu_name, null))
        });
        this.categories.push(newStrCat);
        });
        console.log(this.categories);
      }
    })
  }

  readStoreMenuCategory(){

  }

}
