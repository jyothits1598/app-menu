import { Component, OnInit } from '@angular/core';
import { StoreProfileDataService } from '../services/store-profile-data.service';

@Component({
  selector: 'app-store-portrait',
  templateUrl: './store-portrait.component.html',
  styleUrls: ['./store-portrait.component.scss']
})
export class StorePortraitComponent implements OnInit {

  constructor(private strProfileData: StoreProfileDataService) { }

  ngOnInit(): void {
  }

}
