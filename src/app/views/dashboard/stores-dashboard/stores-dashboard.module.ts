import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoresDashboardComponent } from './stores-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StoresDashboardComponent
  },
  // {
  //   path: 'stores/:id',
  //   loadChildren: () => import('./restaurant-menu/restaurant-menu.module').then(m => m.RestaurantMenuModule)
  // }
]

const dashboardstoreRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [StoresDashboardComponent],
  imports: [
    CommonModule,
    dashboardstoreRouting
  ]
})
export class StoresDashboardModule { }
