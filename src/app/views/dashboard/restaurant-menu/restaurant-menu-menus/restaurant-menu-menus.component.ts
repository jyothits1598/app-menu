import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMenu, StoreMenuTime } from 'src/app/_models/store-menu';

@Component({
  selector: 'app-restaurant-menu-menus',
  templateUrl: './restaurant-menu-menus.component.html',
  styleUrls: ['./restaurant-menu-menus.component.scss']
})
export class RestaurantMenuMenusComponent implements OnInit , OnDestroy{
  menus : Array<StoreMenu>= [];
  
  constructor(
    public route: ActivatedRoute
    , private storeService: StoreService
    , private restApiService: RestApiService
  ) { }

  ngOnDestroy(): void {
  }

  fetchMenus(){
    this.menus = [];
    this.restApiService.getData(`store/menus/availability/get/${this.storeService.activeStore}/all`, (response)=>{
      if(response['data'] && response['data'].length > 0){
        let data = response['data'];
        data.forEach(menu => {
          let newMenu = new StoreMenu();
          newMenu.id = menu.menu_details.menu_id;
          newMenu.name = menu.menu_details.menu_name;
          newMenu.availability = this.storeService.readAvailability(menu.availability);
          this.menus.push(newMenu);
        });
      }
    });
  }

  ngOnInit(): void {
    this.fetchMenus();
  }

}
