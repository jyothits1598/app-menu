import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMenuOverviewComponent } from './restaurant-menu-overview/restaurant-menu-overview.component';
import { StoreMenuOverviewDetailedComponent } from './store-menu-overview-detailed/store-menu-overview-detailed.component';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { StoreMenuOverviewCategoryListComponent } from './store-menu-overview-category-list/store-menu-overview-category-list.component';
import { StoreMenuItemsCreateComponent } from '../store-menu-items-create/store-menu-items-create.component';
import { SampleComponentComponent } from './sample-component/sample-component.component';
import { StoreMenuCategoriesCreateComponent } from '../store-menu-categories-create/store-menu-categories-create.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantMenuOverviewComponent,
    children: [
      {
        path: 'item/:id', component: StoreMenuItemsCreateComponent
      },
      {
        path: 'category/:id', component: StoreMenuCategoriesCreateComponent
      }
    ]
  }
]

const restaurantMenuOverviewRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [RestaurantMenuOverviewComponent, StoreMenuOverviewDetailedComponent, StoreMenuOverviewCategoryListComponent, SampleComponentComponent],
  imports: [
    CommonModule,
    SharedModule,
    restaurantMenuOverviewRouting
  ]
})
export class StoreMenuOverviewModule { }
