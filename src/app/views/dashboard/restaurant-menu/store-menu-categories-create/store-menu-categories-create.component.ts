import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-menu-categories-create',
  templateUrl: './store-menu-categories-create.component.html',
  styleUrls: ['./store-menu-categories-create.component.scss']
})
export class StoreMenuCategoriesCreateComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  menu : {[key: string]: boolean} = {
    "lunch" : false,
    "dinner" : false,
  };

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  pagebackPopup(back) {
    this.modalService.open(back, { centered: true });
  }

}
