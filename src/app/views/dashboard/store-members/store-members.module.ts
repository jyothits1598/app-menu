import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreMembersComponent } from './store-members.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberContainerComponent } from './member-container/member-container.component';

const routes: Routes = [
  {
    path: '',
    component: MemberContainerComponent,
    children: [
      {
        path: '',
        component: MemberContainerComponent,
        children: [
          {
            path: '',
            component: MembersComponent
          },
          {
            path: 'profile/:id',
            component: MemberProfileComponent
          }
        ]
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
  declarations: [StoreMembersComponent, MembersComponent, MemberProfileComponent, MemberContainerComponent],
  imports: [
    CommonModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StoreMembersModule { }
