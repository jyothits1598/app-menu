import { Injectable, ComponentFactoryResolver, ViewContainerRef, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogConfig } from '../_model/confirmation-dialog-config';
import { switchMap, take, tap } from 'rxjs/operators';
import { of, throwError, Observable, from } from 'rxjs';
import { ModalRef, NgbsModalRef } from '../_model/modal-ref';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbModal: NgbModal) { }

  getConfirmation(config: ConfirmationDialogConfig): Observable<boolean> {

    let modal = this.ngbModal.open(ConfirmationDialogComponent, { centered: true });
    modal.componentInstance.config = config;
    // return modal.componentInstance.decision.pipe(
    //   take(1),
    //   switchMap((value)=>{
    //     if(value == config.confirmBtn) return of(true);
    //     else return throwError(false);
    //   })
    // );

    return from(modal.result).pipe(
      take(1)
    );
  }

  openTemplate(template: TemplateRef<any>): ModalRef{
    let ngbRef = this.ngbModal.open(template, {size: 'xl'});
    return new NgbsModalRef(ngbRef);
  }
}
