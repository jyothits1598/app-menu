import { Component, OnInit, Input } from '@angular/core';
import { StoreBankDetails } from '../../_model/store-bank-details';
import { StoreProfileDataService } from '../../_services/store-profile-data.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-bank-details',
  templateUrl: './store-bank-details.component.html',
  styleUrls: ['./store-bank-details.component.scss']
})
export class StoreBankDetailsComponent implements OnInit {
  
  @Input() storeBankDetail: StoreBankDetails;

  constructor() { }

  ngOnInit(): void {
    
  }

}
