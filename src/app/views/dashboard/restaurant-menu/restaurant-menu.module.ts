import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantMenuComponent } from './restaurant-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMenuOverviewComponent } from './restaurant-menu-overview/restaurant-menu-overview.component';
import { RestaurantMenuMenusComponent } from './restaurant-menu-menus/restaurant-menu-menus.component';
import { RestaurantMenuCategoriesComponent } from './restaurant-menu-categories/restaurant-menu-categories.component';
import { StoreMenuMenusCreateComponent } from './store-menu-menus-create/store-menu-menus-create.component';
import { FormsModule } from '@angular/forms';
import { StoreMenuCategoriesCreateComponent } from './store-menu-categories-create/store-menu-categories-create.component';
import { RestaurantMenuItemsComponent } from './restaurant-menu-items/restaurant-menu-items.component';
import { pathToFileURL } from 'url';

const routes: Routes = [
  {
    path: '',
    component: RestaurantMenuComponent,
    children: [
      {
        path: 'overview',
        component: RestaurantMenuOverviewComponent
      },
      {
        path: 'menus',
        component: RestaurantMenuMenusComponent,
        children: [
          {
            path: 'create/:id',
            component: StoreMenuMenusCreateComponent
          },
          {
            path: 'create',
            component: StoreMenuMenusCreateComponent
          }
        ]
      },
      {
        path: 'categories',
        component: RestaurantMenuCategoriesComponent
      },
      {
        path: 'items',
        component: RestaurantMenuItemsComponent
      },
      {
        path: '**',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  },
]
const restaurantMenuRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [RestaurantMenuComponent, RestaurantMenuOverviewComponent, RestaurantMenuMenusComponent, StoreMenuMenusCreateComponent, RestaurantMenuCategoriesComponent, StoreMenuCategoriesCreateComponent, RestaurantMenuItemsComponent],
  imports: [
    FormsModule,
    CommonModule,
    restaurantMenuRouting,
  ]
})
export class RestaurantMenuModule { }
