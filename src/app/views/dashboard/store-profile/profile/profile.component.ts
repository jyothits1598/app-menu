import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { read } from 'fs';
import { StoreBasicDetailsComponent } from './store-basic-details/store-basic-details.component';
import { StoreProfileDataService } from '../services/store-profile-data.service';
import { StoreService } from 'src/app/services/store.service';
import { Storedetails } from 'src/app/_models/store-menu';
import { StoreBasicDetails } from '../model/store-basic-details';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  storeBasicDetials: StoreBasicDetails;

  @ViewChild('storeDetails', { read: StoreBasicDetailsComponent, static: false }) storeDetails: StoreBasicDetailsComponent;

  constructor(
    private storeDataService: StoreProfileDataService,
    private storeService: StoreService,
    private alertService: AlertService,
    private dataService: DataService,
  ) { }
  ngAfterViewInit(): void {
    this.storeDataService.GetStoreBasicData(this.storeService.activeStore$.value.id).subscribe(
      (data) => {
        this.storeBasicDetials = data;
        this.storeDetails.patchData(this.storeBasicDetials)
      }
    );
  }

  ngOnInit(): void {
  }

  saveStoreDetails(data: StoreBasicDetails) {
    this.alertService.showLoader();
    data.id = this.storeService.activeStore$.value.id;
    this.storeDataService.SaveStoreBasicData(data).pipe(finalize(()=>this.alertService.hideLoader())).subscribe((data)=>{
      this.storeDetails.toggleEdit();
      this.alertService.showNotification('Successfully updated', 'success');
    })
}

  handleImageUpload(file: File) {
    this.alertService.showLoader();
    this.storeDataService.SaveStoreLogo(file).pipe(
      finalize(()=>this.alertService.hideLoader())
    ).subscribe(
      url => {
        this.storeBasicDetials.imageUrl = url;
        this.storeDetails.patchData(this.storeBasicDetials);
      },
      
    )
  }

}
