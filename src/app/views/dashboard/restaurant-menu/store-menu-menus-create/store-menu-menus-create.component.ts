import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreMenuTime } from 'src/app/_models/store-menu';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/_models/store';
import { callbackify } from 'util';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-store-menu-menus-create',
  templateUrl: './store-menu-menus-create.component.html',
  styleUrls: ['./store-menu-menus-create.component.scss']
})
export class StoreMenuMenusCreateComponent implements OnInit, OnDestroy {
  menuId: number = null;
  menuName: FormControl = new FormControl('', Validators.required);
  
  startTime: string = "Select";
  endTime: string = "Select";

  availability: Array<StoreMenuTime> = [];
  deletedAvailability: Array<StoreMenuTime> = [];

  notifier = new Subject();

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

  days: { [key: string]: boolean } = {
    "monday": false,
    "tuesday": false,
    "wednesday": false,
    "thursday": false,
    "friday": false,
    "saturday": false,
    "sunday": false,
  };

  constructor(private route: ActivatedRoute
    , private router: Router
    , private restApiService: RestApiService
    , private storeService: StoreService
    , private alertService: AlertService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      if (params['id']) {
        this.fetchMenu(+params['id']);
      }
    })
  }

  fetchMenu(id: number) {
    this.restApiService.getData(`store/menus/availability/get/${this.storeService._activeStore}/${id}`, (response) => {
      console.log("resp from get availability", response);
      if(response.success){
        this.menuName.setValue(response.data[0].menu_details.menu_name);
        this.menuId = response.data[0].menu_details.menu_id;
        this.availability = this.storeService.readAvailability(response.data[0].availability);
      }else{
        this.router.navigate(['notfound'],  { relativeTo: this.route });
      }
    })
  }

  addRemvDay(day: string, add: boolean) {
    if (add) {
      this.selectedDays.push(day);
    } else {
      let index = this.selectedDays.findIndex((selectedDay) => { return selectedDay === day });
      this.selectedDays.splice(index, 1);
    }
  }

  //Checks time and day selection.
  stateCheck(): boolean {
    if (this.menuName.invalid) return false;

    if (this.startTime == "Select") return false;
    if (this.endTime == "Select") return false;

    if(this.selectedDays.length == 0) return false;

    return true;
  }

  addAvailability() {
    let menuTime = null;
    this.selectedDays.forEach(day => {
      menuTime = new StoreMenuTime(null, day, this.startTime, this.endTime, false);
      this.insertIntoAvailability(this.availability, menuTime);
    });
  }

  insertIntoAvailability(availability: Array<StoreMenuTime>, menuTime: StoreMenuTime){
    for (let i = 0; i <= availability.length; i++) {
      if(i == availability.length) {
        availability.push(menuTime);
        break;
      }
      if (this.menuTimeComp(menuTime, availability[i]) <= 0) {
        availability.splice(i, 0, menuTime);
        break;
      }
    }
  }

  ngOnDestroy(): void {

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
    return dayValue[first.day] - dayValue[second.day];
  }

  readyToSave(): boolean{
    if(this.menuName.invalid) {
      this.menuName.markAsTouched();
      return false;
    }
    if(this.availability.length == 0){
      return false;
    }

    return true;
  }

  saveMenu(){
    if(!this.readyToSave()){
      this.alertService.showNotification('Please complete the form below');
      return;
    }

    let data: any = {}
    data.opening_time = [];

    data.menu_name = this.menuName.value;
    if(this.menuId) data.menu_id = this.menuId;


    this.availability.forEach((a)=>{
      let menuTime : any = {};
      menuTime.days = a.day;
      menuTime.start_time = a.startTime;
      menuTime.end_time = a.endTime;
      menuTime.marked_as_closed = a.markedAsClose;
      menuTime.active_flag = 1;
      data.opening_time.push(menuTime);
    })

    this.deletedAvailability.forEach((a)=>{
      let menuTime : any = {};
      menuTime.days = a.day;
      menuTime.start_time = a.startTime;
      menuTime.end_time = a.endTime;
      menuTime.marked_as_closed = a.markedAsClose;
      menuTime.active_flag = 0;
      data.opening_time.push(menuTime);
    })

    this.restApiService.postAPI(`store/menus/add/${this.storeService.activeStore}`, data, (resp)=>{
      if(resp.success){
        this.alertService.showNotification(`Menu successfully ${this.menuId? 'updated' : 'created'}`);
        this.router.navigate(['.'], {relativeTo: this.route.parent});
      }else this.alertService.showNotification(`There was an error ${this.menuId? 'updating' : 'creating'} the menu. Please try again.`);
    })

    console.log(data);
  }

  deleteMenu(){

    let data: any = {}
    data.menu_name = this.menuName.value;
    data.menu_id = this.menuId;
    data.active_flag = false;

    this.restApiService.postAPI(`store/menus/add/${this.storeService.activeStore}`, data, (resp)=>{
      if(resp.success){
        this.alertService.showNotification('Menu successfully deleted');
        this.router.navigate(['.'], {relativeTo: this.route.parent});
      }else this.alertService.showNotification(`There was an error deleting the menu. Please try again.`);
    })
  }

  debug() {
    // console.log(this.selectedDays);
    this.alertService.showNotification("this is the alert component");
    this.router.navigate(['notfound'],  { relativeTo: this.route });
  }

}
