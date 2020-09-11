import { Component, OnInit, TemplateRef, OnDestroy, ViewContainerRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';
import { RestApiService } from 'src/app/services/rest-api.service';
import { map, finalize, filter, debounce, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/services/store.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ReadStoreMenuModifier, StoreMenuModifierItem, StoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { Subscription, Observable, fromEvent, interval, of, merge } from 'rxjs';
import { MinNumberValidator } from 'src/app/_helpers/validators';

@Component({
  selector: 'app-store-menu-modifier-group-create',
  templateUrl: './store-menu-modifier-group-create.component.html',
  styleUrls: ['./store-menu-modifier-group-create.component.scss']
})
export class StoreMenuModifierGroupCreateComponent implements OnInit, OnDestroy {

  constructor(public restApiService: RestApiService,
    private _modalService: NgbModal,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.routerSubs = this.route.params.subscribe(params => {
      //creating a new category
      if (params['id'] === undefined) {
        return;
      };

      //update existing category
      this.modifierId = +params['id'];
      // if category is not a number
      if (!this.modifierId) {
        this.router.navigate(['./not-found'], { relativeTo: this.route });
      }
    })
  }

  apiFun = (term) => {return this.restApiService.getDataObs(`stores/${this.storeId}/items?name=${term}`).pipe(
    map((resp:any)=>resp.data)
  )}

  selectItem(item: any) {
    if(this.selectedItems.find((i)=>i.name == item.item_name)) return;
    let stModItem: StoreMenuModifierItem = new StoreMenuModifierItem(item.item_id, item.item_name, item.item_base_price, null, 0);
    this.addItem(stModItem);
  }

  nameAccessor: (any)=>string = (item) => item.item_name;

  // ----------------------- search functionalify end ----------------------------

  routerSubs: Subscription;
  modifierId: number;
  storeId: number;
  submitting: boolean = false;
  allItems: Array<StoreMenuItem> = [];

  selectedItems: Array<StoreMenuItem | StoreMenuModifierItem> = [];

  editedItemIndex: number;

  modifierForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    displayText: new FormControl(),
    selectedItems: new FormArray([], [MinNumberValidator()]),
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
    if (this.modifierId) this.getInitialData();
    this.storeId = this.storeService.activeStore$.value.id;
  }

  getInitialData() {
    this.alertService.showLoader();
    this.restApiService.getDataObs(`modifiers/${this.storeService.activeStore$.value.id}/${this.modifierId}`).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe(
      resp => {
        if (resp.success && resp.data && resp.data[0]) {
          let mod = ReadStoreMenuModifier(resp.data[0]);
          this.modifierForm.controls.name.setValue(mod.name);
          this.modifierForm.controls.displayText.setValue(mod.displayText);
          this.modifierForm.controls.selectionRequired.setValue(mod.selectionRequired);
          this.modifierForm.controls.maxItemsSelectable.setValue(mod.maxItemsSelectable)

          mod.items.forEach(item => {
            this.addItem(item)
          })
        }
      }
    );
  }

  addItem(sItem) {
    // this.selectedItemsForm.markAsTouched({onlySelf: true});
    this.selectedItems.push(sItem);
    this.selectedItemsForm.push(new FormControl(sItem.modifierPrice ? sItem.modifierPrice : 0, Validators.required));
  }

  deleteItem(index: number) {
    // this.selectedItemsForm.markAsTouched({onlySelf: true});
    this.selectedItems.splice(index, 1);
    this.selectedItemsForm.removeAt(index);
  }

  saveModifer(formData: any) {

    if (this.modifierForm.invalid) {
      this.modifierForm.markAllAsTouched();
      return;
    }
    this.submitting = true;

    let data: any = {};
    if (this.modifierId) data.modifier_id = this.modifierId;
    data.store_id = this.storeService.activeStore$.value.id;
    data.modifier_name = formData.name;
    data.required_selection = formData.selectionRequired ? 1 : 0;
    data.max_items_selected = formData.maxItemsSelectable;
    data.modifier_items = [];
    data.display_text = formData.displayText;

    for (let i = 0; i < formData.selectedItems.length; i++) {
      let item = {
        item_id: this.selectedItems[i].id,
        modifier_price: formData.selectedItems[i]
      }
      data.modifier_items.push(item);
    }

    this.restApiService.postData('modifiers', data).pipe(
      finalize(() => { this.submitting = false; })
    ).subscribe((resp) => {
      this.router.navigate(['../'], { relativeTo: this.route })
    });

  }

  // placeHolderForSearch() {
  //   this.restApiService.getDataObs('store/items/get/5/all').pipe(
  //     map((resp: any) => {
  //       if (resp.data && resp.data.length > 0) {
  //         let itemCats: Array<StoreMenuCategory> = [];
  //         resp.data[0].category_details.forEach(cat => {
  //           itemCats.push(new StoreMenuCategory(cat.category_id, cat.category_name, null))
  //         });
  //         return new StoreMenuItem(resp.data[0].item_id, resp.data[0].item_name, resp.data[0].item_base_price, itemCats);
  //       }
  //     })
  //   ).subscribe(item => this.addItem(item));
  // }

  updatePrice(value: string) {
    if (value) this.selectedItemsForm.at(this.editedItemIndex).setValue(parseFloat(value));
    else this.selectedItemsForm.at(this.editedItemIndex).setValue(0);
  }

  deleteModifier() {
    if (!this.modifierId) return;

    var data: any = {};
    data.modifier_id = this.modifierId;
    data.store_id = this.storeService.activeStore$.value.id;
    data.active_flag = 0;

    this.alertService.showLoader();
    this.restApiService.postData('modifiers', data).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe((resp: any) => {
      if (resp && resp.success) this.router.navigate(['../'], { relativeTo: this.route })
    });
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  openitemModifierCentered(itemModifier) {
    this.modalService.open(itemModifier, { centered: true });
  }

  openDisplyinfo(displaytext) {
    this.modalService.open(displaytext, { centered: true });
  }

}
