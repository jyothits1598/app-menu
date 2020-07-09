import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FirstFormsComponent } from './first-forms.component';

const routes: Routes = [
  {
    path: '',
    component: FirstFormsComponent
  },
]
const firstformRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [FirstFormsComponent],
  imports: [
    CommonModule,
    firstformRouting
  ]
})
export class FirstFormsModule { }
