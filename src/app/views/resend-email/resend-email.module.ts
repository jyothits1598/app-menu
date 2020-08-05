import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResendEmailComponent } from './resend-email.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ResendEmailComponent
  },
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [ResendEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    routingModule
  ]
})
export class ResendEmailModule { }
