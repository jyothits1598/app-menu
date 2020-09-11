import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreOwnershipDetails } from '../_model/store-ownership-details';
import { StoreOwnershipDetailsComponent } from './store-ownership-details/store-ownership-details.component';
import { StoreProfileDataService } from '../_services/store-profile-data.service';
import { AlertService } from 'src/app/services/alert.service';
import { StoreService } from 'src/app/services/store.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss']
})
export class OwnershipComponent implements OnInit {

  storeOwnershipDetails : StoreOwnershipDetails;
  @ViewChild('ownershipDetails', { read: StoreOwnershipDetailsComponent, static: false }) ownershipDetails: StoreOwnershipDetailsComponent;

  constructor(
    private storeProfileDataService: StoreProfileDataService,
    private alertService: AlertService,
    private storeService: StoreService
  ) { }
  
  ngAfterViewInit(): void {
    this.storeProfileDataService.GetStoreOwnershipData(this.storeService.activeStore$.value.id).subscribe(
      (data) => {
        this.storeOwnershipDetails = data;
        this.ownershipDetails.patchData(this.storeOwnershipDetails)
      }
    ); 
  }

  ngOnInit(): void {
  }

  saveownerDetails(data: StoreOwnershipDetails) {
    this.alertService.showLoader();
    data.id = this.storeService.activeStore$.value.id;
    this.storeProfileDataService.SaveownershipData(data).pipe(finalize(()=>this.alertService.hideLoader())).subscribe((data)=>{
      this.ownershipDetails.Editbtntoggle();
      this.alertService.showNotification('Successfully updated', 'success');
    })
  }

  

}
