import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-menu-menus-create',
  templateUrl: './store-menu-menus-create.component.html',
  styleUrls: ['./store-menu-menus-create.component.scss']
})
export class StoreMenuMenusCreateComponent implements OnInit {
  mon : boolean = false;
  days : {[key: string]: boolean} = {
    "mon" : false,
    "tue" : false,
    "wed" : false,
    "thu" : false,
    "fri" : false,
    "sat" : false,
    "sun" : false,
  };

  constructor() { }

  ngOnInit(): void {

  }

  debug(){
    console.log(this.days);
  }

}
