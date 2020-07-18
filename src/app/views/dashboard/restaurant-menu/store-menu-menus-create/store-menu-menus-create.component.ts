import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreMenuTime } from 'src/app/_models/menu-time';

@Component({
  selector: 'app-store-menu-menus-create',
  templateUrl: './store-menu-menus-create.component.html',
  styleUrls: ['./store-menu-menus-create.component.scss']
})
export class StoreMenuMenusCreateComponent implements OnInit {
  startTime : string = "Select";
  endTime : string = "Select";

  availability : Array<StoreMenuTime> = [];

  time : Array<string> = [
    '12:00AM'
    ,'12:30AM'
    ,'01:00AM'
    ,'01:30AM'
    ,'02:00AM'
    ,'02:30AM'
    ,'03:00AM'
    ,'03:30AM'
    ,'04:00AM'
    ,'04:30AM'
    ,'05:00AM'
    ,'05:30AM'
    ,'05:00AM'
    ,'05:30AM'
    ,'06:00AM'
    ,'06:30AM'
    ,'07:00AM'
    ,'07:30AM'
    ,'08:00AM'
    ,'08:30AM'
    ,'09:00AM'
    ,'09:30AM'
    ,'10:00AM'
    ,'10:30AM'
    ,'11:00AM'
    ,'11:30AM'
    ,'12:00PM'
    ,'12:30PM'
    ,'01:00PM'
    ,'01:30PM'
    ,'02:00PM'
    ,'02:30PM'
    ,'03:00PM'
    ,'03:30PM'
    ,'04:00PM'
    ,'04:30PM'
    ,'05:00PM'
    ,'05:30PM'
    ,'05:00PM'
    ,'05:30PM'
    ,'06:00PM'
    ,'06:30PM'
    ,'07:00PM'
    ,'07:30PM'
    ,'08:00PM'
    ,'08:30PM'
    ,'09:00PM'
    ,'09:30PM'
    ,'10:00PM'
    ,'10:30PM'
    ,'11:00PM'
    ,'11:30PM'
  ]

  days : {[key: string]: boolean} = {
    "monday" : false,
    "tuesday" : false,
    "wednesday" : false,
    "thursday" : false,
    "friday" : false,
    "saturday" : false,
    "sunday" : false,
  };

  constructor() { }

  ngOnInit(): void {
  }

  //Checks time and day selection.
  stateCheck() : boolean{
    if(this.startTime == "Select") return false;
    if(this.endTime == "Select") return false;

    let sum = 0;
    for (const property in this.days) {
      if(this.days[property]) sum += 1;
    }
    if(sum>0) return true;
    
    return false;
  }

  addMenuAvailability(){
    this.availability.push(new StoreMenuTime("monday", "05:00AM", "06:00AM", false, true));
  }

  debug(){
    console.log(this.stateCheck());
  }

}
