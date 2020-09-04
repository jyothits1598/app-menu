import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreShellComponent } from './store-shell/store-shell.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: StoreShellComponent,
  },
]

@NgModule({
  declarations: [StoreShellComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreShellModule { }
