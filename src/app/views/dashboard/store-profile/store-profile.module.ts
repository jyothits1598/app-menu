import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreProfileComponent } from './store-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreOwnershipDetailsComponent } from './store-ownership-details/store-ownership-details.component';
import { StoreProfileDataService } from './_services/store-profile-data.service';
import { StoreBasicDetailsComponent } from './profile/store-basic-details/store-basic-details.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BankComponent } from './bank/bank.component';
import { StoreBankDetailsComponent } from './bank/store-bank-details/store-bank-details.component';

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
        component: BankComponent,
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
  declarations: [StoreProfileComponent, StoreBankDetailsComponent, StoreOwnershipDetailsComponent, StoreBasicDetailsComponent, ProfileComponent, BankComponent],
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
