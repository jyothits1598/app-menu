import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store-menu-overview-detailed',
  templateUrl: './store-menu-overview-detailed.component.html',
  styleUrls: ['./store-menu-overview-detailed.component.scss']
})
export class StoreMenuOverviewDetailedComponent implements OnInit {
  dropdownChild = true;
  right_image:string = "../../../assets/images/ico_right.png";
  down_image:string = "../../../assets/images/ico_down.png";

  constructor(
    private _modalService: NgbModal,
    public route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get modalService(): NgbModal{
    return this._modalService;
  }

  toggleClass() {
    this.dropdownChild = !this.dropdownChild;
  }
}
