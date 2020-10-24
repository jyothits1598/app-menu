import { Component, OnInit, Output, EventEmitter, Input, TemplateRef, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { TimeAvailability, TimeAvailabilityComp } from '../_model/time-availability';
declare let $: any;

@Component({
  selector: 'time-availability-editor',
  templateUrl: './time-availability-editor.component.html',
  styleUrls: ['./time-availability-editor.component.scss']
})
export class TimeAvailabilityEditorComponent implements AfterViewInit {
  @Output() onChange = new EventEmitter<Array<TimeAvailability>>();
  constructor() { }
  
  ngAfterViewInit(): void {
    if(this.headingTempalte)
    this.headingSlot.createEmbeddedView(this.headingTempalte);
  }
  
  @Input() headingTempalte: TemplateRef<any>;

  @Input() set availability(a: Array<TimeAvailability>){
    if(a) this._availability = a;
  }
  
  @ViewChild('headingSlot', { read: ViewContainerRef }) headingSlot: ViewContainerRef;
  
  //variables to track status
  touched: boolean = false;
  dirty: boolean = false;
  
  _availability: Array<TimeAvailability> = [];
  selectedDays: Array<string> = [];
  
  daysTouched: boolean = false;
  
  // tou = true;

  // active_add_image:string = "assets/images/ico_add.png";
  // inactive_add_image:string = "assets/images/ico_add_light.png";

  time: Array<string> = [
    '12:00AM'
    , '12:30AM'
    , '01:00AM'
    , '01:30AM'
    , '02:00AM'
    , '02:30AM'
    , '03:00AM'
    , '03:30AM'
    , '04:00AM'
    , '04:30AM'
    , '05:00AM'
    , '05:30AM'
    , '06:00AM'
    , '06:30AM'
    , '07:00AM'
    , '07:30AM'
    , '08:00AM'
    , '08:30AM'
    , '09:00AM'
    , '09:30AM'
    , '10:00AM'
    , '10:30AM'
    , '11:00AM'
    , '11:30AM'
    , '12:00PM'
    , '12:30PM'
    , '01:00PM'
    , '01:30PM'
    , '02:00PM'
    , '02:30PM'
    , '03:00PM'
    , '03:30PM'
    , '04:00PM'
    , '04:30PM'
    , '05:00PM'
    , '05:30PM'
    , '06:00PM'
    , '06:30PM'
    , '07:00PM'
    , '07:30PM'
    , '08:00PM'
    , '08:30PM'
    , '09:00PM'
    , '09:30PM'
    , '10:00PM'
    , '10:30PM'
    , '11:00PM'
    , '11:30PM'
  ]

  timing: FormGroup = new FormGroup({
    startTime: new FormControl('09:00AM'),
    endTime: new FormControl('05:00PM')
  }, this.timingValidator())

  addRemvDay(day: string, add: boolean) {
    this.daysTouched = true;
    if (add) {
      this.selectedDays.push(day);
    } else {
      let index = this.selectedDays.findIndex((selectedDay) => { return selectedDay === day });
      this.selectedDays.splice(index, 1);
    }
  }

  timingValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      
      if ((<FormGroup>control).controls.startTime.value == 'Select'
        || (<FormGroup>control).controls.endTime.value == 'Select') return { 'noSelection': 'Start and end time are required' };

      if ((<FormGroup>control).controls.startTime.value == (<FormGroup>control).controls.endTime.value) return { 'sameSelection': 'Start and end time can not be the same' };
      if ((<FormGroup>control).controls.startTime.value && (<FormGroup>control).controls.endTime.value) {
        $('#active_button').addClass('primary-color');
      }
      return null;
    };
  }

  insertIntoAvailability(availability: Array<TimeAvailability>, timeAvai: TimeAvailability) {
    for (let i = 0; i <= availability.length; i++) {

      //case: menuTime is the largest in the array
      if (i == availability.length) {
        availability.push(timeAvai);
        break;
      }

      let compVal = TimeAvailabilityComp(timeAvai, availability[i]);

      if (compVal < 0) {
        availability.splice(i, 0, timeAvai);
        break;
      }

      //donot insert if there is an identical StoreMenuTime
      if (compVal == 0) break;
    }
  }

  
  addAvailability() {
    this.dirty= true;
    
    if (this.timing.invalid || this.selectedDays.length == 0) {
      this.timing.markAllAsTouched();
      this.daysTouched = true;
      return;
    }
    this.touched = true;

    let menuTime = null;
    this.selectedDays.forEach(day => {
      menuTime = new TimeAvailability(null, day, this.timing.controls.startTime.value, this.timing.controls.endTime.value, false);
      this.insertIntoAvailability(this._availability, menuTime);
    });

    this.onChange.emit(this._availability);
  }

  deleteAvailability(index: number){
    this.dirty= true;
    this.touched = true;
    this._availability.splice(index, 1)[0];
    this.onChange.emit(this._availability);
  }

}
