import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingApprovalComponent} from './pending-approval.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PendingApprovalComponent
  },
]
const pendingAppRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [PendingApprovalComponent],
  imports: [
    CommonModule,
    pendingAppRouting
  ]
})
export class PendingApprovalModule { }
