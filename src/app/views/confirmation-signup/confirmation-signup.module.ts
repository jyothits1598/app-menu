import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationSignupComponent } from './confirmation-signup.component';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationSignupComponent
  },
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [ConfirmationSignupComponent],
  imports: [
    CommonModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ConfirmationSignupModule { }
