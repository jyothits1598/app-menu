import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { StoreProfileDataService } from '../_services/store-profile-data.service';
import { StoreBankDetails } from '../_model/store-bank-details';
import { StoreBankDetailsComponent } from './store-bank-details/store-bank-details.component';
import { AlertService } from 'src/app/services/alert.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit, AfterViewInit {

  storeBankDetails: StoreBankDetails;

  @ViewChild('bankDetails', { read: StoreBankDetailsComponent, static: false }) bankDetails: StoreBankDetailsComponent;

  constructor(private storeProfileDataService: StoreProfileDataService,
    private storeService: StoreService,
    private alertService: AlertService,) { }

  ngAfterViewInit(): void {
    this.storeProfileDataService.GetStoreBankData(this.storeService.activeStore$.value.id).subscribe(
      (data) => {
        this.storeBankDetails = data;
        this.bankDetails.patchData(this.storeBankDetails)
      }
    );
  }

  ngOnInit(): void {

  }

  savebankDetails(data: StoreBankDetails) {
    this.alertService.showLoader();
    data.id = this.storeService.activeStore$.value.id;
    this.storeProfileDataService.SaveStoreBankData(data).pipe(finalize(() => this.alertService.hideLoader())).subscribe((data) => {
      this.bankDetails.Editbtntoggle();
      this.alertService.showNotification('Successfully updated', 'success');
    },
      (error) => {
        console.log('error in savebank details', error);
        this.alertService.showNotification(error.error.error.bsb_number[0], 'error');
      })
  }
}
