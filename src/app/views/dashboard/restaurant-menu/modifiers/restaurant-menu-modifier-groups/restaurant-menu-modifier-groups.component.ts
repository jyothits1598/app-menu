import { Component, OnInit } from '@angular/core';
import { StoreMenuModifier, ReadStoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { StoreMenuDataService } from '../../_services/store-menu-data.service';
import { ModifierDisplay, ModifiersToModifierDisplay } from '../../_models/modifier-display';

@Component({
  selector: 'app-restaurant-menu-modifier-groups',
  templateUrl: './restaurant-menu-modifier-groups.component.html',
  styleUrls: ['./restaurant-menu-modifier-groups.component.scss']
})
export class RestaurantMenuModifierGroupsComponent implements OnInit {
  constructor(private restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private _modalService: NgbModal,
    public stringHelperService: StringHelperService,
    private storeMenuData: StoreMenuDataService
  ) { }

  modifiers: Array<ModifierDisplay> = [];
  modifierIndexToBeDeleted: number;

  get modalService(): NgbModal {
    return this._modalService;
  }

  ngOnInit(): void {
    this.alertService.showLoader();
    this.storeMenuData.allModifiers().pipe(
      finalize(() => { this.alertService.hideLoader() })
    ).subscribe((data) => {
      this.modifiers = ModifiersToModifierDisplay(data);
      console.log(this.modifiers);
    })

  }

  nameAccessor: (item) => string = (item: any) => item.name;

  deleteModifier(index: number) {
    let mod = this.modifiers[index];
    this.alertService.showLoader();

    this.storeMenuData.deleteModifier(mod.modifier.id).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe((resp: any) => {
      if (resp && resp.success) this.modifiers.splice(index, 1);
    });
  }

}
