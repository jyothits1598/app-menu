import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMenu, StoreMenuTime } from 'src/app/_models/store-menu';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-menu-menus',
  templateUrl: './restaurant-menu-menus.component.html',
  styleUrls: ['./restaurant-menu-menus.component.scss']
})
export class RestaurantMenuMenusComponent implements OnInit, OnDestroy {
  menus: Array<StoreMenu> = [];
  routerSub$ : Subscription;
  constructor(
    public route: ActivatedRoute
    , private router: Router
    , private storeService: StoreService
    , private restApiService: RestApiService
  ) {
    
    this.routerSub$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd && this.route.children.length == 0)
    ).subscribe((event) => {
      this.fetchMenus();
    });

  }

  ngOnDestroy(): void {
    this.routerSub$.unsubscribe();
  }

  fetchMenus() {
    this.menus = [];
    
    if(!this.storeService.activeStore) { return this.router.navigate(['../notfound'], {relativeTo: this.route});}

    this.restApiService.getData(`store/menus/availability/get/${this.storeService.activeStore}/all`, (response) => {
      if (response['data'] && response['data'].length > 0) {
        let data = response['data'];
        data.forEach(menu => {
          let newMenu = new StoreMenu(menu.menu_details.menu_id, menu.menu_details.menu_name, this.storeService.readAvailability(menu.availability));
          this.menus.push(newMenu);
        });
      }
    });
  }

  ngOnInit(): void {

  }

}
