import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Store } from 'src/app/_models/store';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreMenu } from 'src/app/_models/store-menu';
import { StoreMenuCategory } from 'src/app/_models/store-menu-category';
import { StoreMenuItemsCreateComponent } from '../store-menu-items-create/store-menu-items-create.component';

@Component({
  selector: 'app-store-menu-modifier-group-create',
  templateUrl: './store-menu-modifier-group-create.component.html',
  styleUrls: ['./store-menu-modifier-group-create.component.scss']
})
export class StoreMenuModifierGroupCreateComponent implements OnInit {

  isLoading: boolean = false;
  submitting: boolean = false;

  selectedItems: Array<StoreMenuItem> = [];
  selectedItemName: string;
  
  constructor(private restApiService: RestApiService,
    private _modalService: NgbModal) { }

  modifierForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    selectedItems: new FormArray([]),
    selectionRequired: new FormControl(false),
    maxItemsSelectable: new FormControl(null)
  })

  get modalService(): NgbModal {
    return this._modalService;
  }

  get selectedItemsForm() {
    return this.modifierForm.controls.selectedItems as FormArray;
  }

  ngOnInit(): void {
    this.placeHolderForSearch()
  }

  addItem(storeMenu: StoreMenuItem) {
    console.log('additem called', storeMenu);
    this.selectedItems.push(storeMenu);
    this.selectedItemsForm.push(new FormControl(null, Validators.required))
  }

  saveModifer(formData: any) {
    if (this.modifierForm.invalid) {
      this.modifierForm.markAllAsTouched();
    }
  }

  placeHolderForSearch() {
    this.restApiService.getDataObs('store/items/get/5/all').pipe(
      map((resp: any) => {
        if (resp.data && resp.data.length > 0) {
          let itemCats: Array<StoreMenuCategory> = [];
          resp.data[0].category_details.forEach(cat => {
            console.log('foreach loop', cat)
            itemCats.push(new StoreMenuCategory(cat.category_id, cat.category_name, null))
          });
          return new StoreMenuItem(resp.data[0].item_id, resp.data[0].item_name, resp.data[0].item_base_price, itemCats);
        }
      })
    ).subscribe(item => this.addItem(item));
  }

  debug() {
    console.log(this.modifierForm);
  }

}
