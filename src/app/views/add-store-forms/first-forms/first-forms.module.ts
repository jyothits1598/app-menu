import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FirstFormsComponent } from './first-forms.component';
import { SharedModule } from '../../shared/shared.module';

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
    firstformRouting,
    SharedModule
  ]
})
export class FirstFormsModule { }
