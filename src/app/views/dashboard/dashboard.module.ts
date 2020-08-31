import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'stores/:id',
    children: [
      {
        path: 'menu',
        loadChildren: () => import('./restaurant-menu/restaurant-menu.module').then(m => m.RestaurantMenuModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./store-profile/store-profile.module').then(m => m.StoreProfileModule)
      },
    ],
  },
]
const dashboardRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    dashboardRouting
  ]
})
export class DashboardModule { }
