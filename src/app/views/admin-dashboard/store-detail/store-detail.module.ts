import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorePendingDetailsComponent } from './admin-store-details/admin-store-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: ':id',
    component: StorePendingDetailsComponent
  }
]

@NgModule({
  declarations: [StorePendingDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class StoreDetailModule { }
