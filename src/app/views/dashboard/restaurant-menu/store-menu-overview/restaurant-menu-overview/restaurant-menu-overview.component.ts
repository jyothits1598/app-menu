import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { finalize, filter } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-menu-overview',
  templateUrl: './restaurant-menu-overview.component.html',
  styleUrls: ['./restaurant-menu-overview.component.scss']
})
export class RestaurantMenuOverviewComponent implements OnInit {
  isLoading: boolean = false;
  
  menuAvailable: boolean;
  categoryAvailable: boolean;
  itemAvailable: boolean;
  modifiersAvailable: boolean;

  nextStep: { stepName: string, route: string } = null;

  constructor(private storeService: StoreService,
    private restApiService: RestApiService,
    private alertservice: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.alertservice.showLoader();
    this.isLoading = true;
    this.restApiService.getDataObs('store/overview/status/' + this.storeService.activeStore$.value.id).pipe(
      finalize(() => { this.isLoading = false; this.alertservice.hideLoader() })
    ).subscribe(
      (resp) => {
        this.alertservice.hideLoader();
        if (resp && resp.success && resp.data) {
          this.menuAvailable = resp.data.menu_status;
          this.categoryAvailable = resp.data.category_status;
          this.itemAvailable = resp.data.item_status;
          this.modifiersAvailable = resp.data.modifier_status;
          this.nextStep = this.determinNextStep();
        }
      },
      (error) => { this.nextStep = { stepName: 'menu', route: '../menus' } }
    )
  }

  determinNextStep(): { stepName: string, route: string } {
    if (!this.menuAvailable) return { stepName: 'menu', route: '../../../../../menus/editor' };
    if (!this.categoryAvailable) return { stepName: 'category', route: '../../../../../categories/new' };
    if (!this.itemAvailable) return { stepName: 'item', route: '../../../../../items/new' };
    if (!this.modifiersAvailable) return { stepName: 'modifier group', route: '../../../../../modifier-groups/new' };
    return null;
  }

}
