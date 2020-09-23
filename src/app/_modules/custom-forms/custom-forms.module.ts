import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectUnsavedDirective } from './protect-unsaved.directive';



@NgModule({
  declarations: [ProtectUnsavedDirective],
  imports: [
    CommonModule
  ],
  exports: [ProtectUnsavedDirective]
})
export class CustomFormsModule { }
