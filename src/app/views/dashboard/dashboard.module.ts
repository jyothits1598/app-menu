import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent} from './dashboard.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
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
