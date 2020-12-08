import { Component, OnInit, Output, EventEmitter, Input, TemplateRef, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { TimeAvailability, TimeAvailabilityComp } from '../_model/time-availability';
import { TimeAvailabilityService, TimeFormat } from '../_services/time-availability.service';

@Component({
  selector: 'time-availability-editor',
  templateUrl: './time-availability-editor.component.html',
  styleUrls: ['./time-availability-editor.component.scss']
})
export class TimeAvailabilityEditorComponent implements AfterViewInit {
  @Output() onChange = new EventEmitter<Array<TimeAvailability>>();
  constructor(private timeAvailabilityServ: TimeAvailabilityService) {
    let pref = this.timeAvailabilityServ.getPreference();
    if (pref) {
      this.format24hr = pref === TimeFormat.hrs24 ? true : false;
    } else this.format24hr = false;
  }

  ngAfterViewInit(): void {
    if (this.headingTempalte)
      this.headingSlot.createEmbeddedView(this.headingTempalte);
  }

  format24hr: boolean;

  @Input() headingTempalte: TemplateRef<any>;

  @Input() set availability(a: Array<TimeAvailability>) {
    if (a) this._availability = a;
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

      if ((<FormGroup>control).controls.startTime.value == (<FormGroup>control).controls.endTime.value && ((<FormGroup>control).controls.endTime.value !== '12:00AM')) return { 'sameSelection': 'Start and end time can not be the same' };
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

  fmt24to12(time: string) {
    let hours = parseInt(time.substr(0, 2));
    let parsedTime: string;
    if (hours > 12) {
      parsedTime = (hours - 12) + time.substr(2, 4) + 'PM';
    } else {
      parsedTime = hours + time.substr(2, 4) + 'AM'
    }
    return parsedTime.length === 4 ? '0' + parsedTime : parsedTime;
  }

  fmt12to24(time: string): string {
    let hours = parseInt(time.substr(0, 2));
    let parsedHours;
    if (time.substr(5, 2) === 'PM') {
      // if (hours === 12) return 12;
      // else return hours + 12;
      parsedHours = (hours === 12 ? 12 : hours + 12) + time.substr(2, 3);
    } else {
      // if (hours === 12) return 0;
      // else return hours;
      parsedHours = (hours === 12 ? 0 : hours) + time.substr(2, 3);
    }
    return parsedHours.length === 4 ? '0' + parsedHours : parsedHours;
  }

  toggleFormat() {
    if (this.format24hr) {
      this.format24hr = false;
      this.timeAvailabilityServ.setPrefence(TimeFormat.hrs12)
    } else {
      this.format24hr = true;
      this.timeAvailabilityServ.setPrefence(TimeFormat.hrs24)
    }
  }

  addAvailability() {
    this.dirty = true;

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

  deleteAvailability(index: number) {
    this.dirty = true;
    this.touched = true;
    this._availability.splice(index, 1)[0];
    this.onChange.emit(this._availability);
  }

}
