import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreBasicDetails } from '../../_model/store-basic-details';

@Component({
  selector: 'app-store-basic-details',
  templateUrl: './store-basic-details.component.html',
  styleUrls: ['./store-basic-details.component.scss']
})
export class StoreBasicDetailsComponent implements OnInit {

  @Input() storeBasicDetail: StoreBasicDetails;
  @Output() saved = new EventEmitter<StoreBasicDetails>();
  @Output() imageOpened = new EventEmitter<File>();

  cuisines: any = ['African: Ethiopian', 'African: other', 'Alcohol', 'American', 'New York', 'Asian fusion', 'Asian: other', 'BBQ', 'Bakery']

  //normalMode is false while editing of details
  normalMode: boolean = true;
  imageUrl : string;

  constructor() { }

  basicDetails: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cuisineType : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    googleUrl : new FormControl(''),
    facebookUrl : new FormControl(''),
  })

  basicDetailCache: any = null;
  imageUrlCache: string = null;

  ngOnInit(): void {
  }

  patchData(data: StoreBasicDetails){
    this.basicDetails.patchValue(data);
    this.imageUrl = data.imageUrl;
  }

  getDetails(): StoreBasicDetails | false{
    if(this.basicDetails.invalid) {
      this.basicDetails.markAllAsTouched()
      return null;
    }
    else return this.basicDetails.value;
  }

  toggleEdit(){
    //if going to edit-mode, save a copy of original values
    if(this.normalMode) {
      this.basicDetailCache = this.basicDetails.value;
      this.imageUrlCache = this.imageUrl;
    }
    this.normalMode = !this.normalMode;
  }

  cancelEdit(){
    this.normalMode = !this.normalMode;
    this.basicDetails.patchValue(this.basicDetailCache);
    this.imageUrl = this.imageUrlCache;
  }

  onSubmit(){
    if(this.basicDetails.invalid) {
      this.basicDetails.markAllAsTouched();
    }
    else{
      let currentData = this.basicDetails.value;
      currentData.imageUrl = this.imageUrl;
      this.saved.emit(currentData);
    }
  }

  onFileChanged(event : any){
    if(event.target.files[0]) this.imageOpened.emit(event.target.files[0]);
  }

  displayError(cntlName: string): boolean{
    return this.basicDetails.controls[cntlName].invalid && this.basicDetails.controls[cntlName].touched;
  } 

}
