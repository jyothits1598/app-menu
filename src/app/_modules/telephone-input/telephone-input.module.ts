import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelephoneInputComponent } from './telephone-input/telephone-input.component';


@NgModule({
  declarations: [TelephoneInputComponent],
  imports: [
    CommonModule,
  ],
  exports: [TelephoneInputComponent]
})
export class TelephoneInputModule { }
