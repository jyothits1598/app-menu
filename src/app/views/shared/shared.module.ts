import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BtnIconDirective } from './directives/btn-icon.directive';



@NgModule({
  declarations: [NotFoundComponent, BtnIconDirective],
  imports: [
    CommonModule
  ],
  exports: [BtnIconDirective]
})
export class SharedModule { }
