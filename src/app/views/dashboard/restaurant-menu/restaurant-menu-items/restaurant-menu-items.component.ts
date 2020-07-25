import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';

import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-menu-items',
  templateUrl: './restaurant-menu-items.component.html',
  styleUrls: ['./restaurant-menu-items.component.scss']
})
export class RestaurantMenuItemsComponent implements OnInit, OnDestroy {
  items = new Array();
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
      this.fetchItems();
    });
  }

  ngOnDestroy(): void {
    this.routerSub$.unsubscribe();
  }

  ngOnInit(): void {
  
  }

  fetchItems(){
     this.items = [];
    
    if(!this.storeService.activeStore) { return this.router.navigate(['../notfound'], {relativeTo: this.route});}

    this.restApiService.getData(`store/items/get/${this.storeService.activeStore}/all`, (response) => {
      if (response['data'] && response['data'].length > 0) {
        let data = response['data'];
        data.forEach(items => {
           this.items.push(items);
        });
        console.log(this.items);
      }
    });
  }
  


}
