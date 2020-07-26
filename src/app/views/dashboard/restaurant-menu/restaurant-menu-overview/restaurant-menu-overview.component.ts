import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-restaurant-menu-overview',
  templateUrl: './restaurant-menu-overview.component.html',
  styleUrls: ['./restaurant-menu-overview.component.scss']
})
export class RestaurantMenuOverviewComponent implements OnInit {

  constructor(private storeService: StoreService
    , private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.restApiService.getData(`store/${this.storeService.activeStore}`
    , (resp)=>{
      if(resp.data && resp.data.length > 0){
        this.storeService.activeStoreName = resp.data[0].store_name;
      }
    })
  }



}
