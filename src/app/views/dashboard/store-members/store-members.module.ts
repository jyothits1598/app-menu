import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreMembersComponent } from './store-members.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path: '',
    component: StoreMembersComponent,
    children: [
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: '**',
        redirectTo: 'members',
        pathMatch: 'full'
      }
    ]
  },
]
const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StoreMembersComponent, MembersComponent],
  imports: [
    CommonModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StoreMembersModule { }
