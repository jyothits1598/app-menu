import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailTokenExpiredComponent } from './email-token-expired.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmailTokenExpiredComponent
  },
]

const routingModule = RouterModule.forChild(routes);
@NgModule({
  declarations: [EmailTokenExpiredComponent],
  imports: [
    CommonModule,
    routingModule
  ]
})
export class EmailTokenExpiredModule { }
