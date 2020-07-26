import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-menu-items-create',
  templateUrl: './store-menu-items-create.component.html',
  styleUrls: ['./store-menu-items-create.component.scss']
})
export class StoreMenuItemsCreateComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  stock_item : {[key: string]: boolean} = {
    "yes" : false,
    "no" : false,
  };

  sell_item : {[key: string]: boolean} = {
    "sellYes" : false,
    "sellNo" : false
  };

  items : {[key: string]: boolean} = {
    "Drinks" : false,
    "Sweets" : false
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  opencategoryCentered(category) {
    this.modalService.open(category, { centered: true });
  }

  openmodifierCentered(modifier) {
    this.modalService.open(modifier, { centered: true });
  }

  pagebackPopup(back) {
    this.modalService.open(back, { centered: true, size: 'sm' });
  }
}
