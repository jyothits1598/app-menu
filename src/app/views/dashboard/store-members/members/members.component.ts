import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  get modalService(): NgbModal{
    return this._modalService;
  }

}
