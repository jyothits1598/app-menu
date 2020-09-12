import { Component, OnInit } from '@angular/core';
import { StoreMenuTime } from 'src/app/_models/store-menu';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit {
  store_id:string;
  daysTouched: boolean = false;
  submitting: boolean = false;
  availabilityTouched = false;

  constructor(
    private _modalService: NgbModal,
    private restApiservice: RestApiService,
    
  ) { 
    // this.store_id = this.route.snapshot.paramMap.get('store-id');
  }

  ngOnInit(): void {
    // var obj = this;
    // obj.getstoreDetails();
  }

  get modalService(): NgbModal{
    return this._modalService;
  }

  timing: FormGroup = new FormGroup({
    startTime: new FormControl('Select'),
    endTime: new FormControl('Select')
  }, this.timingValidator())

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

  selectedDays: Array<string> = [];
  availability: Array<StoreMenuTime> = [];
  finalAvailability: Array<StoreMenuTime> = [];

  deletedAvailability: Array<StoreMenuTime> = [];

  days: { [key: string]: boolean } = {
    "monday": false,
    "tuesday": false,
    "wednesday": false,
    "thursday": false,
    "friday": false,
    "saturday": false,
    "sunday": false,
  };

  timingValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if ((<FormGroup>control).controls.startTime.value == 'Select'
        || (<FormGroup>control).controls.endTime.value == 'Select') return { 'noSelection': 'Start and end time are required' };

      if ((<FormGroup>control).controls.startTime.value == (<FormGroup>control).controls.endTime.value) return { 'sameSelection': 'Start and end time can not be the same' };

      return null;
    };
  }

  addRemvDay(day: string, add: boolean) {
    this.daysTouched = true;
    if (add) {
      this.selectedDays.push(day);
    } else {
      let index = this.selectedDays.findIndex((selectedDay) => { return selectedDay === day });
      this.selectedDays.splice(index, 1);
    }
  }

  addAvailability() {
    if (this.timing.invalid || this.selectedDays.length == 0) {
      this.timing.markAllAsTouched();
      this.daysTouched = true;
      return;
    }
    this.availabilityTouched = true;

    let menuTime = null;
    this.selectedDays.forEach(day => {
      menuTime = new StoreMenuTime(null, day, this.timing.controls.startTime.value, this.timing.controls.endTime.value, false);
      this.insertIntoAvailability(this.availability, menuTime);
    });
  }

  insertIntoAvailability(availability: Array<StoreMenuTime>, menuTime: StoreMenuTime) {
    for (let i = 0; i <= availability.length; i++) {

      //case: menuTime is the largest in the array
      if (i == availability.length) {
        availability.push(menuTime);
        break;
      }

      let compVal = this.menuTimeComp(menuTime, availability[i]);

      if (compVal < 0) {
        availability.splice(i, 0, menuTime);
        break;
      }

      //donot insert if there is an identical StoreMenuTime
      if (compVal == 0) break;
    }
  }

  menuTimeComp(first: StoreMenuTime, second: StoreMenuTime) {
    const dayValue = {
      monday: 1
      , tuesday: 2
      , wednesday: 3
      , thursday: 4
      , friday: 5
      , saturday: 6
      , sunday: 7
    }
    //are first and second different days
    if (dayValue[first.day] - dayValue[second.day]) return dayValue[first.day] - dayValue[second.day];

    //compare start-times
    let firstSTime = new Date('1/1/0001 ' + first.startTime.substr(0, 5) + ':00 ' + first.startTime.substr(5, 2)).getTime();
    let secondSTime = new Date('1/1/0001 ' + second.startTime.substr(0, 5) + ':00 ' + second.startTime.substr(5, 2)).getTime();

    if (firstSTime !== secondSTime) return firstSTime - secondSTime;

    //compare end-times
    let firstETime = new Date('1/1/0001 ' + first.endTime.substr(0, 5) + ':00 ' + first.endTime.substr(5, 2)).getTime();
    let secondETime = new Date('1/1/0001 ' + second.endTime.substr(0, 5) + ':00 ' + second.endTime.substr(5, 2)).getTime();

    return firstETime - secondETime;
  }

  // getstoreDetails() {
  //   if (this.store_id) {
  //     this.restApiservice.getData(`api/stores/${this.store_id}/storedata`, (response) => {
  //       console.log(response);
  //     });
  //   }
  // }
}
