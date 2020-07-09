import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ThirdFormsComponent } from './third-forms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ThirdFormsComponent
  },
]
const thirdformRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [ThirdFormsComponent],
  imports: [
    CommonModule,
    thirdformRouting,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ThirdFormsModule { }
