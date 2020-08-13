import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMenuOverviewComponent } from './restaurant-menu-overview/restaurant-menu-overview.component';
import { StoreMenuOverviewDetailedComponent } from './store-menu-overview-detailed/store-menu-overview-detailed.component';

const routes: Routes = [
  { path: '', component: RestaurantMenuOverviewComponent }
]

const restaurantMenuOverviewRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [RestaurantMenuOverviewComponent, StoreMenuOverviewDetailedComponent],
  imports: [
    CommonModule,
    restaurantMenuOverviewRouting
  ]
})
export class StoreMenuOverviewModule { }
