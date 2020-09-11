import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  @Input() storeOwnerDetail: StoreOwnershipDetails;
  @Output() saved = new EventEmitter<StoreOwnershipDetails>();
  @Output() fileOpened = new EventEmitter<File>();

  constructor() { }

  ownershipDetails: FormGroup = new FormGroup({
    ownerName: new FormControl('', Validators.required),
    buinessName: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', Validators.required),
    legalFile: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  Editbtntoggle(){    
    this.activeMode = !this.activeMode;
  }

  patchData(data: StoreOwnershipDetails){
    this.ownershipDetails.patchValue(data);
  }

  getDetails(): StoreOwnershipDetails | false{
    if(this.ownershipDetails.invalid) {
      this.ownershipDetails.markAllAsTouched()
      return null;
    }
    else return this.ownershipDetails.value;
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
   
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
      this.legalFile = '';
    }
  }

}
