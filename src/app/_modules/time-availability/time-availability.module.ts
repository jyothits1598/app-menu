import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAvailabilityEditorComponent } from './time-availability-editor/time-availability-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAvailabilitySummaryComponent } from './time-availability-summary/time-availability-summary.component';



@NgModule({
  declarations: [TimeAvailabilityEditorComponent, TimeAvailabilitySummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TimeAvailabilityEditorComponent, TimeAvailabilitySummaryComponent
  ]
})
export class TimeAvailabilityModule { }
