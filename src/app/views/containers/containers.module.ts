import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers.component';
import { AuthGuard } from 'src/app/_guards';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component'
import { UnautherisedComponent } from '../shared/components/unautherised/unautherised.component';
import { OwnerRoleGuard, AdminRoleGuard } from 'src/app/_guards/user-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainersComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'partner',
        canActivate: [OwnerRoleGuard],
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        canActivate: [AdminRoleGuard],
        loadChildren: () => import('../admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
      },
      { path: 'adminboard', loadChildren: () => import('../admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)},
      { path: 'unauthorized', component: UnautherisedComponent },
    ],
    data: {
      permission: [2]
    },
  }
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [ContainersComponent, SideNavBarComponent],
  imports: [
    CommonModule,
    routingModule
  ]
})
export class ContainersModule { }
