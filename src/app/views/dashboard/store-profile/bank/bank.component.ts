import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { StoreProfileDataService } from '../_services/store-profile-data.service';
import { StoreBankDetails } from '../_model/store-bank-details';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  storeBankDetails: StoreBankDetails;

  constructor(private storeProfileDataService: StoreProfileDataService, 
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeProfileDataService.GetStoreBankData(this.storeService.activeStore$.value.id).subscribe(
      data => this.storeBankDetails = data
    )
  }

}
