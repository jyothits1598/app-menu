import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationDialogConfig } from '../../model/confirmation-dialog-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() config: ConfirmationDialogConfig;
  @Output() decision = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

  onClick(decision: string) {
    if(decision == this.config.confirmBtn) this.activeModal.close(decision);
    else this.activeModal.dismiss(decision);
  }

}
