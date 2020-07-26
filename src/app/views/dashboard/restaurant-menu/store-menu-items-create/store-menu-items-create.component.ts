import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { ThirdFormsComponent } from 'src/app/views/add-store-forms/third-forms/third-forms.component';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store-menu-items-create',
  templateUrl: './store-menu-items-create.component.html',
  styleUrls: ['./store-menu-items-create.component.scss']
})
export class StoreMenuItemsCreateComponent implements OnInit, OnDestroy {
  itemId: number = null;
  uploadedImagePath:string;

  routerSubs: Subscription;

  isLoading: boolean = false;
  saveBtnLoading: boolean = false;

  categoryIdMap: Array<{ name: string, id: number }> = [];
  modifierIdMap: Array<{ name: string, id: number }> = [];

  createItemForm: FormGroup = new FormGroup({
    itemName: new FormControl('', Validators.required),
    itemDescription :new FormControl(''),
    itemKeyword: new FormControl(''),
    itemBasePrice : new FormControl(''),
    itemStock : new FormControl(''),
    sellitem : new FormControl(''),
    categories : new FormArray([]),
    modifier : new FormArray([])
    // menus: new FormArray([], [this.minChecksValidator()])
  })

  constructor(
    private modalService: NgbModal,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.routerSubs = this.route.params.subscribe(params => {
        //creating a new category
        if (params['id'] === undefined) {
          this.fetchInitialData();
          return;
        };
  
        //update existing category
        this.itemId = +params['id'];
        // if category is not a number
        if (!this.itemId) {
          this.router.navigate(['./not-found'], { relativeTo: this.route });
        }
        this.fetchInitialData();
      })
     }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.alertService.hideLoader();
  }

  // stock_item : {[key: string]: boolean} = {
  //   "yes" : false,
  //   "no" : false,
  // };

  // sell_item : {[key: string]: boolean} = {
  //   "sellYes" : false,
  //   "sellNo" : false
  // };

  

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  opencategoryCentered(category) {
    this.modalService.open(category, { centered: true });
  }

  openmodifierCentered(modifier) {
    this.modalService.open(modifier, { centered: true });
  }

  pagebackPopup(back) {
    this.modalService.open(back, { centered: true });
  }

  minChecksValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let sum = 0;
      (<FormArray>control).controls.forEach(ctrl => {
        if (ctrl.value) sum += 1;
      });
      return sum ? null : { 'MinimumSelection': "Please select atleast one menu" };
    };
  }

  fetchInitialData() {
    this.isLoading = true;
    this.restApiService.getData('store/items/category/' + this.storeService.activeStore
      , (resp) => {
        if (resp.success && resp.data) {
          this.isLoading = false;
          resp.data.forEach(category => {
            this.categoryIdMap.push({ id: category.category_id, name: category.category_name });
            (<FormArray>this.createItemForm.controls.categories).push(new FormControl(false));
          });
      
          //if we have a valid categoryId fetch category data
          if (this.itemId) {
            this.isLoading = true;
            this.restApiService.getData(`store/items/get/${this.storeService.activeStore}/${this.itemId}`
              , (resp) => {
                this.isLoading = false;
                if (resp.success && resp.data.length > 0) {
                  let menuItem = resp.data[0];
                  this.createItemForm.controls.itemName.setValue(menuItem.item_name);
                  this.createItemForm.controls.itemDescription.setValue(menuItem.item_description);
                  this.createItemForm.controls.itemKeyword.setValue(menuItem.item_keyword);
                  this.createItemForm.controls.itemBasePrice.setValue(menuItem.item_base_price);
                  this.createItemForm.controls.itemStock.setValue(menuItem.item_in_stock.toString());
                  this.createItemForm.controls.sellitem.setValue(menuItem.item_individual.toString());
                  this.uploadedImagePath = menuItem.item_image;
                  menuItem.category_details.forEach(activeCategory => {
                    let index: number = this.categoryIdMap.findIndex(category => activeCategory.category_id == category.id);
                    if (index != -1) (<FormArray>this.createItemForm.controls.categories).controls[index].setValue(true);
                  });
                }
              })
          }

        }
      })

      this.restApiService.getData('store/items/modifier/' + this.storeService.activeStore
      , (resp) => {
        if (resp.success && resp.data) {
          this.isLoading = false;
          resp.data.forEach(modifier => {
            this.modifierIdMap.push({ id: modifier.modifier_id, name: modifier.modifier_name });
            (<FormArray>this.createItemForm.controls.modifier).push(new FormControl(false));
          });

          //if we have a valid categoryId fetch category data
          if (this.itemId) {
            this.isLoading = true;
            this.restApiService.getData(`store/items/get/${this.storeService.activeStore}/${this.itemId}`
              , (resp) => {
                this.isLoading = false;
                if (resp.success && resp.data.length > 0) {
                  let modifierItem =resp.data[0];
                  modifierItem.category_details.forEach(activeModifier => {
                    let index: number = this.modifierIdMap.findIndex(modifier => activeModifier.id == modifier.id);
                    if (index != -1) (<FormArray>this.createItemForm.controls.modifier).controls[index].setValue(true);
                  });
                }
              })
          }

        }
      })
  }

  saveData() {
    //check if entered data is valid
    if (this.createItemForm.invalid) {
      this.createItemForm.markAllAsTouched();
      return;
    }
  
    //construct data before sending to backend backend
    var data: any = {};
    data.item_name = this.createItemForm.value.itemName;
    data.item_description = this.createItemForm.value.itemDescription;
    data.item_keyword = this.createItemForm.value.itemKeyword;
    data.item_base_price = this.createItemForm.value.itemBasePrice;
    data.item_in_stock = this.createItemForm.value.itemStock;
    data.item_individual = this.createItemForm.value.sellitem;
    data.item_image =  this.uploadedImagePath;
    if (this.itemId) data.item_id = this.itemId;
    let checkCategoryValues: Array<boolean> = this.createItemForm.controls.categories.value;
    let selectedCategory: Array<{ "category_id": number }> = [];
    for (let i = 0; i < checkCategoryValues.length; i++) {
      //if any checkbox is true
      if (checkCategoryValues[i]) {
        //pull id from menu-to-id map
        selectedCategory.push({ "category_id": this.categoryIdMap[i].id })
      }
    }
    data.item_category = selectedCategory;
    //selected modifier list 
    let checkModifierValues: Array<boolean> = this.createItemForm.controls.modifier.value;
    let selectedModifier: Array<{ "modifier_id": number }> = [];
    for (let i = 0; i < checkModifierValues.length; i++) {
      //if any checkbox is true
      if (checkModifierValues[i]) {
        //pull id from menu-to-id map
        selectedModifier.push({ "modifier_id": this.modifierIdMap[i].id })
      }
    }
    data.item_modifier = selectedModifier;

    this.saveBtnLoading = true;
    this.restApiService.postAPI(`store/items/add/${this.storeService.activeStore}`
      , data
      , (resp) => {
        if (resp.success) {
          this.saveBtnLoading = false;
          this.alertService.showNotification(`Item was successfully ${this.itemId ? "Updated" : "Created"}`);
          this.navigateBack();
        }
      }
      , (errResp) => {
        this.saveBtnLoading = false;
        this.alertService.showNotification("There was a problem, please try again.")
      }
    )
  }

  deleteData() {

    if (!this.itemId) return;

    let data: any = {};
    data.item_id = this.itemId;
    data.item_name = this.createItemForm.value.itemName;
    data.active_flag = 1;

    if (this.itemId) data.item_id = this.itemId;
    this.restApiService.postAPI(`store/items/add/${this.storeService.activeStore}`
      , data
      , (resp) => {
        if (resp.success) {
          this.alertService.showNotification('Item successfully deleted.');
          this.navigateBack();
        }
      }
      , (err) => {
        this.alertService.showNotification('There was an error while deleting the category, please try again.');
      })
  }

  categoryForm() {
    return (<FormArray>this.createItemForm.controls.categories).controls;
  }

  modifierForm() {
    return (<FormArray>this.createItemForm.controls.modifier).controls;
  }

  onFileChanged(event) {
    if(event.target.files[0]){
      let form_data = new FormData();
      form_data.append('item_image',event.target.files[0],event.target.files[0].name);
      this.restApiService.pushSaveFileToStorageWithFormdata(form_data,'/store/items/upload/image',(response)=>{
        if(response && response['success'] && response['data']) { 
          this.uploadedImagePath=response['data'];
        }
      })
    }
  }
}

