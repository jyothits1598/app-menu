import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { URL_AdminApprovedStores } from 'src/environments/api-endpoint';

@Component({
  selector: 'app-store-approved-list',
  templateUrl: './store-approved-list.component.html',
  styleUrls: ['./store-approved-list.component.scss']
})
export class StoreApprovedListComponent implements OnInit {

  approvedStores: Array<{}>;
  constructor(private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.restApiService.getDataObs(URL_AdminApprovedStores).subscribe(
      (resp) => {
        if (resp && resp.data) {
          this.approvedStores = [];
          resp.data.forEach(store => {
            this.approvedStores.push({ id: store.store_id, name: store.store_name, claimType: store.type_of_creation })
          });
        }
      }
    )
  }

}
