import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export class NgbsModalRef implements ModalRef{
    _ref: NgbModalRef
    constructor(ref: NgbModalRef){
        this._ref = ref;
    }
    dismiss(): void {
        this._ref.dismiss();
    }
    
}

export interface ModalRef{
    dismiss(): void;
}
