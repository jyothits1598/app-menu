import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProfileComponent } from './store-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreEditPortraitComponent } from './store-edit-portrait/store-edit-portrait.component';
import { StoreBankDetailsComponent } from './store-bank-details/store-bank-details.component';
import { StoreOwnershipDetailsComponent } from './store-ownership-details/store-ownership-details.component';
import { StoreProfileDataService } from './services/store-profile-data.service';
import { StoreBasicDetailsComponent } from './profile/store-basic-details/store-basic-details.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: StoreProfileComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
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
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StoreProfileComponent, StoreEditPortraitComponent, StoreBankDetailsComponent, StoreOwnershipDetailsComponent, StoreBasicDetailsComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routingModule
  ],
  providers: [StoreProfileDataService]
})
export class StoreProfileModule { }
