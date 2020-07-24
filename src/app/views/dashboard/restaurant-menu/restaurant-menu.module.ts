import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantMenuComponent } from './restaurant-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMenuOverviewComponent } from './restaurant-menu-overview/restaurant-menu-overview.component';
import { RestaurantMenuMenusComponent } from './restaurant-menu-menus/restaurant-menu-menus.component';
import { RestaurantMenuCategoriesComponent } from './restaurant-menu-categories/restaurant-menu-categories.component';
import { StoreMenuMenusCreateComponent } from './store-menu-menus-create/store-menu-menus-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreMenuCategoriesCreateComponent } from './store-menu-categories-create/store-menu-categories-create.component';
import { RestaurantMenuItemsComponent } from './restaurant-menu-items/restaurant-menu-items.component';
import { pathToFileURL } from 'url';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreMenuItemsCreateComponent } from './store-menu-items-create/store-menu-items-create.component';

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
            path: 'editor/:id',
            component: StoreMenuMenusCreateComponent
          },
          {
            path: 'editor',
            component: StoreMenuMenusCreateComponent
          },
          {
            path: 'editor/:id/notfound',
            component: NotFoundComponent
          }
        ]
      },
      {
        path: 'categories',
        component: RestaurantMenuCategoriesComponent
      },
      {
        path: 'categories/:id',
        component: StoreMenuCategoriesCreateComponent
      },
      {
        path: 'categories/new',
        component: StoreMenuCategoriesCreateComponent
      },
      {
        path: 'items',
        component: RestaurantMenuItemsComponent,
        children: [
          {
            path: 'editor',
            component: StoreMenuItemsCreateComponent
          },
        ]
      },
      {
        path: '**',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  }
  
]
const restaurantMenuRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [RestaurantMenuComponent, RestaurantMenuOverviewComponent, RestaurantMenuMenusComponent, StoreMenuMenusCreateComponent, RestaurantMenuCategoriesComponent, StoreMenuCategoriesCreateComponent, RestaurantMenuItemsComponent, StoreMenuItemsCreateComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgbModalModule,
    restaurantMenuRouting
  ]
})
export class RestaurantMenuModule { }
