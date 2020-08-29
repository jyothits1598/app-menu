import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // vCRef: ViewContainerRef;

  constructor(
    private ngbModal: NgbModal) { }

  GetConfirmation() {
    let modal = this.ngbModal.open(ConfirmationDialogComponent, {centered: true});
    console.log(modal.componentInstance);
  }
}
