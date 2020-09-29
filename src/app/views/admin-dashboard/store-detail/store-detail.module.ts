import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorePendingDetailsComponent } from './admin-store-details/admin-store-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { StoreMenuResolver } from 'src/app/_guards/store-menu-resolver';
import { StoreDetailContainerComponent } from './store-detail-container/store-detail-container.component';

const routes: Routes = [
  {
    path: ':id',
    resolve: { store: StoreMenuResolver },
    component: StoreDetailContainerComponent,
    children: [
      {
        path: 'approval',
        component: StorePendingDetailsComponent,
      },
      {
        path: 'profile',
        loadChildren: () => import('../../dashboard/store-profile/store-profile.module').then(m => m.StoreProfileModule)
      },
      {
        path: '**',
        redirectTo: 'approval',
        pathMatch: 'full'
      },
    ]
  }

]

@NgModule({
  declarations: [StorePendingDetailsComponent, StoreDetailContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: []
})
export class StoreDetailModule { }
