import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { StoreService } from 'src/app/services/store.service';
import { StoreMenu } from 'src/app/_models/store-menu';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreItem } from 'src/app/services/store-item';
import { StoreMenuService } from 'src/app/services/store-menu.service';

@Component({
  selector: 'app-restaurant-menu-categories',
  templateUrl: './restaurant-menu-categories.component.html',
  styleUrls: ['./restaurant-menu-categories.component.scss']
})
export class RestaurantMenuCategoriesComponent implements OnInit {
  storeId: number;
  deleteIndex: number;
  categories: Array<StoreMenuCategory> = [];


  constructor(private restApiService: RestApiService
    , private _modalService: NgbModal
    , private storeService: StoreService
    , private alertService: AlertService
    , private storeMenuService: StoreMenuService) { }

  ngOnInit(): void {
    this.storeId = this.storeService.activeStore$.value.id;
    this.alertService.showLoader();
    this.restApiService.getData(`store/category/get/${this.storeId}/all`
      , (response) => {
        if (response.success && response.data) {
          response.data.forEach((cat) => {
            let menuCat = this.storeService.ReadStoreMenuCategory(cat);
            this.categories.push(menuCat);
          });
          console.log(this.categories);
          this.alertService.hideLoader();
        }
      }
      , (err) => {
        this.alertService.hideLoader();
        this.alertService.showNotification('There was an error fetching your data. Please try again')
      })
  }

  deleteCategory() {
    let category = this.categories[this.deleteIndex];
    
    this.storeMenuService.DeleteStoreMenuCategory(this.storeId, category.id, category.name).subscribe(
      (resp: any) => {
        if (resp.success) {
          this.alertService.showNotification('Category successfully deleted.');
          this.categories.splice(this.deleteIndex, 1);
        }
      },
      (err) => {
        this.alertService.showNotification('There was an error while deleting the category, please try again.');
      }
    )
  }

  menuListToString(menus: Array<StoreMenu | StoreItem>) {
    let result = "";
    if (!menus[0]) return result;
    result += menus[0].name;
    if (menus[1]) result += ', ' + menus[1].name;
    if (menus.length > 2) result += `, +${menus.length - 2}`;
    return result;
  }

  get modalService(): NgbModal {
    return this._modalService;
  }


}


