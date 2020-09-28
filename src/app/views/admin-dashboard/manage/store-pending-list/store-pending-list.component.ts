import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { URL_AdminPendingStores } from 'src/environments/api-endpoint';
import { take } from 'rxjs/operators';
import { ModalService } from 'src/app/views/shared/services/modal.service';
import { ConfirmationDialogConfig } from 'src/app/views/shared/_model/confirmation-dialog-config';

@Component({
  selector: 'app-store-pending-list',
  templateUrl: './store-pending-list.component.html',
  styleUrls: ['./store-pending-list.component.scss']
})
export class StorePendingListComponent implements OnInit {

  pendingStores: Array<{ id: number, name: string, claimType: string, applicant: string }>;

  constructor(private restApiService: RestApiService,
    private modalService: ModalService,
    private vCRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.restApiService.getDataObs(URL_AdminPendingStores).subscribe(
      (resp) => {
        if (resp && resp.data) {
          this.pendingStores = [];
          resp.data.forEach(store => {
            this.pendingStores.push({ id: store.store_id, name: store.store_name, claimType: store.type_of_creation, applicant:store.legal_owner_name })
          });
        }
      }
    )
  }

}
