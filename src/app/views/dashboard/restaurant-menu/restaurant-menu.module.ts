import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantMenuComponent } from './restaurant-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantMenuMenusComponent } from './restaurant-menu-menus/restaurant-menu-menus.component';
import { RestaurantMenuCategoriesComponent } from './restaurant-menu-categories/restaurant-menu-categories.component';
import { StoreMenuMenusCreateComponent } from './store-menu-menus-create/store-menu-menus-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreMenuCategoriesCreateComponent } from './store-menu-categories-create/store-menu-categories-create.component';
import { RestaurantMenuItemsComponent } from './restaurant-menu-items/restaurant-menu-items.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreMenuCategoriesContainerComponent } from './store-menu-categories-container/store-menu-categories-container.component';
import { StoreMenuItemsCreateComponent } from './store-menu-items-create/store-menu-items-create.component';
import { StoreMenuItemContainerComponent } from './store-menu-item-container/store-menu-item-container.component';
import { StoreMenuResolver } from 'src/app/_guards/store-menu-resolver';
import { RestaurantMenuModifierGroupsComponent } from './restaurant-menu-modifier-groups/restaurant-menu-modifier-groups.component';
import { StoreMenuModifierGroupCreateComponent } from './store-menu-modifier-group-create/store-menu-modifier-group-create.component';
import { OverlayModule } from '@angular/cdk/overlay';

const routes: Routes = [
  {
    path: '',
    component: RestaurantMenuComponent,
    resolve: {store: StoreMenuResolver},
    children: [
      { path: 'overview', loadChildren: () => import('./store-menu-overview/store-menu-overview.module').then(m => m.StoreMenuOverviewModule)},
      // { path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)},
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
        component: StoreMenuCategoriesContainerComponent,
        children: [
          {
            path: '',
            component: RestaurantMenuCategoriesComponent
          },
          {
            path: 'new',
            component: StoreMenuCategoriesCreateComponent
          },
          {
            path: ':id',
            component: StoreMenuCategoriesCreateComponent
          },
          {
            path: ':id/not-found',
            component: NotFoundComponent
          }
        ]
      },
      {
        path: 'items',
        component: StoreMenuItemContainerComponent,
        children: [
          {
            path: '',
            component: RestaurantMenuItemsComponent
          },
          {
            path: 'new',
            component: StoreMenuItemsCreateComponent
          },
          {
            path: ':id',
            component: StoreMenuItemsCreateComponent
          },
          {
            path: ':id/not-found',
            component: NotFoundComponent
          }
        ]
      },
      {
        path: 'modifier-groups',
        children: [
          {
            path: '',
            component: RestaurantMenuModifierGroupsComponent
          },
          {
            path: 'new',
            component: StoreMenuModifierGroupCreateComponent
          },
          {
            path: ':id',
            component: StoreMenuModifierGroupCreateComponent
          },
          {
            path: ':id/not-found',
            component: NotFoundComponent
          }
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
  declarations: [RestaurantMenuComponent, RestaurantMenuMenusComponent, StoreMenuMenusCreateComponent, RestaurantMenuCategoriesComponent, StoreMenuCategoriesCreateComponent, RestaurantMenuItemsComponent, StoreMenuCategoriesContainerComponent, StoreMenuItemsCreateComponent, StoreMenuItemContainerComponent, RestaurantMenuModifierGroupsComponent, StoreMenuModifierGroupCreateComponent ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgbModalModule,
    restaurantMenuRouting,
    OverlayModule
  ],
  providers: [StoreMenuResolver]
})
export class RestaurantMenuModule { }
