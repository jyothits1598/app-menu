import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FifthFormsComponent } from './fifth-forms.component';

const routes: Routes = [
  {
    path: '',
    component: FifthFormsComponent
  },
]
const fifthformRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [FifthFormsComponent],
  imports: [
    CommonModule,
    fifthformRouting
  ]
})
export class FifthFormsModule { }
