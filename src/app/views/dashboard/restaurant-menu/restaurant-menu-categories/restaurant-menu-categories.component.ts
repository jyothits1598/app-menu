import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { StoreService } from 'src/app/services/store.service';
import { StoreMenu } from 'src/app/_models/store-menu';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreItem } from 'src/app/services/store-item';

@Component({
  selector: 'app-restaurant-menu-categories',
  templateUrl: './restaurant-menu-categories.component.html',
  styleUrls: ['./restaurant-menu-categories.component.scss']
})
export class RestaurantMenuCategoriesComponent implements OnInit {
  deleteIndex: number;
  categories: Array<StoreMenuCategory> = [];
  isLoading: boolean = false;

  constructor(private restApiService: RestApiService
    , private _modalService: NgbModal
    , private storeService: StoreService
    , private alertService: AlertService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.restApiService.getData(`store/category/get/${this.storeService.activeStore}/all`
      , (response) => {
        if (response.success && response.data) {
          response.data.forEach((cat) => {
            let menuCat = this.storeService.ReadStoreMenuCategory(cat);
            this.categories.push(menuCat);
          });
          console.log(this.categories);
          this.isLoading = false;
        }
      }
      , (err)=>{
        this.isLoading = false;
        this.alertService.showNotification('There was an error fetching your data. Please try again')
      })
  }

  deleteCategory() {
    let category = this.categories[this.deleteIndex];

    let data: any = {};
    data.category_id = category.id;
    data.category_name = category.name;
    data.active_flag = 0;

    this.restApiService.postAPI(`store/category/add/${this.storeService.activeStore}`
      , data
      , (resp) => {
        if (resp.success) {
          this.alertService.showNotification('Category successfully deleted.');
          this.categories.splice(this.deleteIndex, 1);
        }
      }
      , (err) => {
        this.alertService.showNotification('There was an error while deleting the category, please try again.');
      })
  }

  menuListToString(menus: Array<StoreMenu | StoreItem>){
    let result = "";
    if(!menus[0]) return result;
    result += menus[0].name;
    if(menus[1]) result += ', ' + menus[1].name;
    if(menus.length > 2) result += ` +${menus.length-2}`;
    return result;
  }

  get modalService(): NgbModal{
    return this._modalService;
  }


}


