import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavBarComponent } from './side-nav-bar.component';
import { SideNavClickDirective } from './_directives/side-nav-click.directive';



@NgModule({
  declarations: [SideNavBarComponent, SideNavClickDirective],
  imports: [
    CommonModule
  ],
  exports: [SideNavBarComponent, SideNavClickDirective]
})
export class SideNavBarModule { }
