import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMenu, StoreMenuTime } from 'src/app/_models/store-menu';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-restaurant-menu-menus',
  templateUrl: './restaurant-menu-menus.component.html',
  styleUrls: ['./restaurant-menu-menus.component.scss']
})
export class RestaurantMenuMenusComponent implements OnInit, OnDestroy {
  menus: Array<StoreMenu> = [];
  routerSub$: Subscription;

  modifierIndexToBeDeleted: number;
  deletemenuIndex : number; 
  menuName:string;
  constructor(
    public route: ActivatedRoute
    , private router: Router
    , private storeService: StoreService
    , private restApiService: RestApiService
    , private alertService: AlertService
    , private _modalService: NgbModal
     
  ) {

    this.routerSub$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd && this.route.children.length == 0)
    ).subscribe((event) => {
      this.fetchMenus();
    });

  }

  get modalService(): NgbModal{
    return this._modalService;
  }

  ngOnDestroy(): void {
    this.routerSub$.unsubscribe();
  }

  fetchMenus() {
    this.menus = [];

    if (!this.storeService.activeStore) { return this.router.navigate(['../notfound'], { relativeTo: this.route }); }
    this.alertService.showLoader();
    this.restApiService.getData(`store/menus/availability/get/${this.storeService.activeStore}/all`
      , (response) => {
        this.alertService.hideLoader();
        if (response['data'] && response['data'].length > 0) {
          let data = response['data'];
          data.forEach(menu => {
            let newMenu = new StoreMenu(menu.menu_details.menu_id, menu.menu_details.menu_name, this.storeService.readAvailability(menu.availability));
            this.menus.push(newMenu);
          });
        }
        this.alertService.hideLoader();
      }
      , (error)=>{
        this.alertService.hideLoader();
      });
  }

  deleteMenu() {
    let menu: StoreMenu = this.menus[this.deletemenuIndex];
    let data: any = {}
    data.menu_name = menu.name;
    data.menu_id = menu.id;
    data.active_flag = 0;
    
    this.restApiService.postAPI(`store/menus/add/${this.storeService.activeStore}`, data, (resp) => {
      
      if (resp.success) {
        this.alertService.showNotification('Menu successfully deleted');
        this.menus.splice(this.deletemenuIndex, 1);
      } else this.alertService.showNotification(`There was an error deleting the menu. Please try again.`);
    })
  }

  ngOnInit(): void {

  }

}
