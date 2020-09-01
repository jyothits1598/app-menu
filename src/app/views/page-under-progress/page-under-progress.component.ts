import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-page-under-progress',
  templateUrl: './page-under-progress.component.html',
  styleUrls: ['./page-under-progress.component.scss']
})
export class PageUnderProgressComponent implements OnInit {

  constructor(private modalService: ModalService) { }
  
  ngOnInit(): void {
  }
}
