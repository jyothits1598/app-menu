import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreBankDetails } from '../../_model/store-bank-details';
import { StoreProfileDataService } from '../../_services/store-profile-data.service';
import { StoreService } from 'src/app/services/store.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-bank-details',
  templateUrl: './store-bank-details.component.html',
  styleUrls: ['./store-bank-details.component.scss']
})
export class StoreBankDetailsComponent implements OnInit {
  
  @Input() storeBankDetail: StoreBankDetails;
  @Output() saved = new EventEmitter<StoreBankDetails>();

  constructor() { }

  activeMode: boolean = true;

  bankDetails: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    bsbNumber: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    
  }

  patchData(data: StoreBankDetails){
    this.bankDetails.patchValue(data);
  }

  getDetails(): StoreBankDetails | false{
    if(this.bankDetails.invalid) {
      this.bankDetails.markAllAsTouched()
      return null;
    }
    else return this.bankDetails.value;
  }

  Editbtntoggle(){    
    this.activeMode = !this.activeMode;
  }

  onbankdetailSubmit() {
    if(this.bankDetails.invalid) {
      this.bankDetails.markAllAsTouched();
    } else {
      let bankdata = this.bankDetails.value;
      this.saved.emit(bankdata);
    }

  }

  displayError(cntlName: string): boolean{
    return this.bankDetails.controls[cntlName].invalid && this.bankDetails.controls[cntlName].touched;
  } 

}
