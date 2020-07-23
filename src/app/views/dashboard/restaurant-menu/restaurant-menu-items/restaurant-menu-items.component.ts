import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-restaurant-menu-items',
  templateUrl: './restaurant-menu-items.component.html',
  styleUrls: ['./restaurant-menu-items.component.scss']
})
export class RestaurantMenuItemsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  stock_item : {[key: string]: boolean} = {
    "yes" : false,
    "no" : false,
  };

  sell_item : {[key: string]: boolean} = {
    "sellYes" : false,
    "sellNo" : false,
  };

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  pagebackPopup(back) {
    this.modalService.open(back, { centered: true });
  }


}
