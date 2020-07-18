import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-store-menu-menus-create',
  templateUrl: './store-menu-menus-create.component.html',
  styleUrls: ['./store-menu-menus-create.component.scss']
})
export class StoreMenuMenusCreateComponent implements OnInit {
  startTime = null;
  endTime = null;

  time = [
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
  ]

  showStartTime: boolean = false;
  showEndTime: boolean = false;

  days : {[key: string]: boolean} = {
    "monday" : false,
    "tuesday" : false,
    "wednesday" : false,
    "thursday" : false,
    "friday" : false,
    "saturday" : false,
    "sunday" : false,
  };

  constructor(private datePipe : DatePipe) { }

  ngOnInit(): void {

  }

  debug(){
    console.log(this.startTime);
  }

}
