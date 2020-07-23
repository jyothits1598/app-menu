import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
// import { MenuCategory } from 'src/app/_models/store-category';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-restaurant-menu-categories',
  templateUrl: './restaurant-menu-categories.component.html',
  styleUrls: ['./restaurant-menu-categories.component.scss']
})
export class RestaurantMenuCategoriesComponent implements OnInit {

  // categories: Array<MenuCategory> = [];

  constructor(private restApiService: RestApiService,
    private storeService: StoreService) {
    
   }

  ngOnInit(): void {
    
    // this.restApiService.getData(`store/items/category/${this.storeService.activeStore}`, (response)=>{
    //   if(response.success && response.data.length > 0){
    //     response.data.forEach(data => {
    //       data.
    //     });
    //   }
    // })
  }

}
