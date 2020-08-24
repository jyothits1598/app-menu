import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { AuthGuard } from 'src/app/_guards';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component'

const routes: Routes = [
  {
    path: '',
    component: ContainersComponent ,children:[
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},  
      { path: 'pending-approval', loadChildren: () => import('../pending-approval/pending-approval.module').then(m => m.PendingApprovalModule)},
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
    ,canActivate: [AuthGuard],
    data: {
      permission:[1]
    },
  }
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [ContainersComponent,SideNavBarComponent],
  imports: [
    CommonModule,
    routingModule
  ]
})
export class ContainersModule { }
