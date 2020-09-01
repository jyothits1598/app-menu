import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProfileComponent } from './store-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreEditPortraitComponent } from './store-edit-portrait/store-edit-portrait.component';
import { StorePortraitComponent } from './store-portrait/store-portrait.component';
import { StoreProfilesContainerComponent } from './store-profiles-container/store-profiles-container.component';
import { StoreBankDetailsComponent } from './store-bank-details/store-bank-details.component';
import { StoreOwnershipDetailsComponent } from './store-ownership-details/store-ownership-details.component';
import { StoreProfileDataService } from './services/store-profile-data.service';
import { StoreBasicDetailsComponent } from './store-basic-details/store-basic-details.component';

const routes: Routes = [
  {
    path: '',
    component: StoreProfileComponent,
    children: [
      {
        path: 'portrait',
        component: StoreProfilesContainerComponent,
        children: [
          {
            path: '',
            component: StorePortraitComponent
          },
          {
            path: 'edit',
            component: StoreEditPortraitComponent
          },
        ]
      },
      {
        path: 'bank',
        component: StoreBankDetailsComponent,
      },
      {
        path: 'ownership',
        component: StoreOwnershipDetailsComponent,
      },
      {
        path: '**',
        redirectTo: 'portrait',
        pathMatch: 'full'
      }
    ]
  },
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StoreProfileComponent, StorePortraitComponent, StoreEditPortraitComponent, StoreProfilesContainerComponent, StoreBankDetailsComponent, StoreOwnershipDetailsComponent, StoreBasicDetailsComponent],
  imports: [
    CommonModule,
    routingModule
  ],
  providers: [StoreProfileDataService]
})
export class StoreProfileModule { }
