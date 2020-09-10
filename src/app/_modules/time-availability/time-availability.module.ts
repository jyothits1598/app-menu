import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAvailabilityEditorComponent } from './time-availability-editor/time-availability-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TimeAvailabilityEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TimeAvailabilityEditorComponent
  ]
})
export class TimeAvailabilityModule { }
