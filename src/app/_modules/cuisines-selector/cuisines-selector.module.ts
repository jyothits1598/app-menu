import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuisinesSelectorComponent } from './cuisines-selector/cuisines-selector.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CuisinesSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CuisinesSelectorComponent]
})
export class CuisinesSelectorModule { }
