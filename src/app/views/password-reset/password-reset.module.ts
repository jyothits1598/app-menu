import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetComponent
  },
]
const routingModule = RouterModule.forChild(routes);


@NgModule({
  declarations: [PasswordResetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routingModule
  ]
})
export class PasswordResetModule { }
