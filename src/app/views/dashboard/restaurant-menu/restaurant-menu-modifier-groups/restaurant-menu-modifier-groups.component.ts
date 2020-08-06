import { Component, OnInit } from '@angular/core';
import { StoreMenuModifier, ReadStoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-restaurant-menu-modifier-groups',
  templateUrl: './restaurant-menu-modifier-groups.component.html',
  styleUrls: ['./restaurant-menu-modifier-groups.component.scss']
})
export class RestaurantMenuModifierGroupsComponent implements OnInit {
  constructor(private restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private _modalService: NgbModal
    ) { }

  modifiers: Array<StoreMenuModifier> = [];
  modifierIndexToBeDeleted: number;

  get modalService(): NgbModal{
    return this._modalService;
  }

  ngOnInit(): void {
    this.alertService.showLoader();
    this.restApiService.getDataObs(`modifiers/${this.storeService.activeStore$.value.id}/all`).pipe(
      finalize(()=>{this.alertService.hideLoader()})
    ).subscribe((resp)=>{
      if(resp && resp.success){
        resp.data.forEach(mod => {
          this.modifiers.push(ReadStoreMenuModifier(mod));
        });
      }
      console.log(this.modifiers);
    });
  }

  deleteModifier(index : number){
    let mod = this.modifiers[index];
    var data : any= {} ;
    data.modifier_id = mod.id;
    data.store_id = this.storeService.activeStore$.value.id;
    data.active_flag = 0;

    this.alertService.showLoader();
    this.restApiService.postData('modifiers', data).pipe(
      finalize(()=>this.alertService.hideLoader())
    ).subscribe((resp : any)=>{
      if(resp && resp.success) this.modifiers.splice(index, 1);
    });
  }

}
