import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { StoreMenu } from 'src/app/_models/store-menu';
import { consolidatedMenuListUrl } from 'src/environments/api-endpoint';
import { map, tap, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { StoreMenuOverviewCategoryListComponent } from '../store-menu-overview-category-list/store-menu-overview-category-list.component';

@Component({
  selector: 'app-store-menu-overview-detailed',
  templateUrl: './store-menu-overview-detailed.component.html',
  styleUrls: ['./store-menu-overview-detailed.component.scss']
})
export class StoreMenuOverviewDetailedComponent implements OnInit {

  storeId: number;
  menus$: Observable<Array<StoreMenu>>;
  selectedMenuId: number;

  routerSub$: Subscription;
  
  @ViewChild("childOutlets", { read: TemplateRef }) routeTemp: TemplateRef<any>;
  @ViewChild("categoryList", { read: StoreMenuOverviewCategoryListComponent }) catListComponent: StoreMenuOverviewCategoryListComponent;
  
  childOutletName: string;

  onSelect(value) {
    this.selectedMenuId = value;
    this.catListComponent.fetchCategories(value);
  }

  constructor(
    private _modalService: NgbModal,
    public route: ActivatedRoute,
    private router: Router,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private ngbModal: NgbModal,

  ) {
    this.routerSub$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((event) => {
      if(this.route.children.length == 0) {
        this.hideModal();
        this.catListComponent.fetchCategories(this.selectedMenuId);
      }
      else {
        this.setOutletName(this.router.url);
        this.showChildRoutes();
      }
    });
   }

  ngOnInit(): void {
    this.storeId = this.storeService.activeStore$.value.id;
    this.menus$ = this.restApiService.getDataObs(consolidatedMenuListUrl(this.storeId)).pipe(
      map((resp: any) => {
        if (resp.success && resp.data) {
          let menus: Array<StoreMenu> = [];
          resp.data.forEach(menu => {
            menus.push(new StoreMenu(menu.menu_id, menu.menu_name, null));
          });
          return menus;
        }
      })
    ).pipe(tap(
      (data) => {
        if (data.length > 0) { setTimeout(() => {
          this.selectedMenuId = data[0].id;
          this.catListComponent.fetchCategories(data[0].id);
        }, 0);  }
      }
    ));

  }

  get modalService(): NgbModal {
    return this._modalService;
  }

  setOutletName(route: string){
    if(route.includes('item'))this.childOutletName = 'Edit Item';
    if(route.includes('category'))this.childOutletName = 'Edit Category';
  }

  showChildRoutes() {
    this.ngbModal.open(this.routeTemp).result.then((result) => { console.log(result) },
      (reason) => {
        this.router.navigate(['../'], { relativeTo: this.route })
      });
  }

  hideModal() {
    this.ngbModal.dismissAll();
    if(this.route.children.length > 0) this.router.navigate(['../'], { relativeTo: this.route });
  }

}
