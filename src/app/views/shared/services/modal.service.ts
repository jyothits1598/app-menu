import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogConfig } from '../model/confirmation-dialog-config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbModal: NgbModal) { }

  GetConfirmation() {
    let confimationConf = new ConfirmationDialogConfig();
    confimationConf.heading = 'Heading';
    confimationConf.dialog = 'Are you sure?';
    confimationConf.confirmBtn = 'Yes';
    confimationConf.declineBtn = 'No';
    let modal = this.ngbModal.open(ConfirmationDialogComponent, { centered: true });
    modal.componentInstance.config = confimationConf;
    modal.componentInstance.decision.subscribe((desc)=> {console.log('from descition', desc)});
  }
}
