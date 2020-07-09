import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FourthFormsComponent } from './fourth-forms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FourthFormsComponent
  },
]
const fourthformRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [FourthFormsComponent],
  imports: [
    CommonModule,
    fourthformRouting,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FourthFormsModule { }
