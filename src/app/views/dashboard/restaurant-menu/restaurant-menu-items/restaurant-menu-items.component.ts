import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { AlertService } from 'src/app/services/alert.service';

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
  item_id:string;
  item_name:string;
  constructor(
    private modalService: NgbModal,
    public route: ActivatedRoute
    , private router: Router
    , private storeService: StoreService
    , private restApiService: RestApiService
    , private alertService: AlertService
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
    this.alertService.hideLoader();
  }

  fetchItems(){
     this.items = [];
    this.alertService.showLoader();
    if(!this.storeService.activeStore) { return this.router.navigate(['../notfound'], {relativeTo: this.route});}

    this.restApiService.getData(`store/items/get/${this.storeService.activeStore}/all`, (response) => {
      if (response['data'] && response['data'].length > 0) {
        let data = response['data'];
        data.forEach(items => {
           this.items.push(items);
        });
        this.alertService.hideLoader();
      }
    });
    this.alertService.hideLoader();
  }
  
  openVerticallyCentered(content,item_id,item_name) {
    this.modalService.open(content, { centered: true });
    this.item_id = item_id;
    this.item_name = item_name;
  }

  deleteData() {

    if (!this.item_id) return;
    this.alertService.showLoader();
    let data: any = {};
    data.item_id = this.item_id;
    data.item_name = this.item_name;
    data.active_flag = 1;

    if (this.item_id) data.item_id = this.item_id;
    this.restApiService.postAPI(`store/items/add/${this.storeService.activeStore}`
      , data
      , (resp) => {
        if (resp.success) {
          this.alertService.showNotification('Item successfully deleted.');
          this.fetchItems();
          this.alertService.hideLoader();
        }
      }
      , (err) => {
        this.alertService.showNotification('There was an error while deleting the category, please try again.');
      })
      this.alertService.showLoader();
  }

}
