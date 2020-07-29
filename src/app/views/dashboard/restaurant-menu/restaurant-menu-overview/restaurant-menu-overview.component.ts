import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-menu-overview',
  templateUrl: './restaurant-menu-overview.component.html',
  styleUrls: ['./restaurant-menu-overview.component.scss']
})
export class RestaurantMenuOverviewComponent implements OnInit {
  menuAvailable: boolean;
  categoryAvailable: boolean;
  itemAvailable: boolean;
  modifireGroupAvailable: boolean;

  isLoading: boolean = false;

  nextStep: {stepName: string, route: string} = null;

  constructor(private storeService: StoreService
    , private restApiService: RestApiService) { }



  ngOnInit(): void {
    this.isLoading = true;
    this.restApiService.getDataObs('store/overview/status/' + this.storeService.activeStore$.value.id).pipe(
      finalize(()=>{this.isLoading = false;})
    ).subscribe(
      (resp) => {
        if (resp && resp.success && resp.data) {
          this.menuAvailable = resp.data.menu_status;
          this.categoryAvailable = resp.data.category_status;
          this.itemAvailable = resp.data.item_status;
          // this.modifireGroupAvailable = resp.data.
          this.nextStep = this.determinNextStep();
        }
      },
      (error)=>{this.nextStep = {stepName: 'menu', route: '../menus'}}
    )
  }

  determinNextStep() : {stepName: string, route: string}{
    if(!this.menuAvailable) return {stepName: 'menu', route: '../menus'};
    if(!this.categoryAvailable) return {stepName: 'category', route: '../categories'};
    if(!this.itemAvailable) return {stepName: 'item', route: '../items'};
    if(!this.modifireGroupAvailable) return {stepName: 'modifer group', route: '../modifierGroup'};
    return null;
  }

}
