import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExtractFileName } from 'src/app/_helpers/string-helpers';
import { StoreOwnershipDetails } from '../../_model/store-ownership-details';

@Component({
  selector: 'app-store-ownership-details',
  templateUrl: './store-ownership-details.component.html',
  styleUrls: ['./store-ownership-details.component.scss']
})
export class StoreOwnershipDetailsComponent implements OnInit {
  activeMode: boolean = true;
  selectedFile: File;
  selectedFileName: string;
  legalFile: string;
  ownershipDetailCache: any = null;

  @Input() storeOwnerDetail: StoreOwnershipDetails;
  @Output() saved = new EventEmitter<StoreOwnershipDetails>();
  @Output() fileUpload = new EventEmitter<boolean>();
  @Output() deleteFile = new EventEmitter<boolean>();

  constructor() { }

  ownershipDetails: FormGroup = new FormGroup({
    ownerName: new FormControl('', Validators.required),
    buinessName: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    legalFile: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  toggleEdit(){ 
    if(this.activeMode) {
      this.ownershipDetailCache = this.ownershipDetails.value;
    }     
    this.activeMode = !this.activeMode;
  }

  cancelForm() {
    this.activeMode = !this.activeMode;
    this.ownershipDetails.patchValue(this.ownershipDetailCache);
  }

  patchData(data: StoreOwnershipDetails){
    this.ownershipDetails.patchValue(data);
  }

  onownershipdetailSubmit() {
    if(!this.legalFile && !this.selectedFile) return;
    if(this.ownershipDetails.invalid) {
      this.ownershipDetails.markAllAsTouched();
    } else {
      let ownershipdata = this.ownershipDetails.value;
      this.saved.emit(ownershipdata);
    }
  }

  displayError(cntlName: string): boolean{
    return this.ownershipDetails.controls[cntlName].invalid && this.ownershipDetails.controls[cntlName].touched;
  }
  
  fileName(fullName: string){
    return ExtractFileName(fullName);
  }

}
