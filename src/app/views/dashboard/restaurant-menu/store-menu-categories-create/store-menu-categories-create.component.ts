import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { ThirdFormsComponent } from 'src/app/views/add-store-forms/third-forms/third-forms.component';
import { AlertService } from 'src/app/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-menu-categories-create',
  templateUrl: './store-menu-categories-create.component.html',
  styleUrls: ['./store-menu-categories-create.component.scss']
})
export class StoreMenuCategoriesCreateComponent implements OnInit {
  categoryId: number = null;
  
  isLoading: boolean = false;
  saveBtnLoading : boolean = false;

  menuIdMap: Array<{ name: string, id: number }> = [];

  createCatForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    menus: new FormArray([], [this.minChecksValidator()] )
  })

  constructor(
    private modalService: NgbModal,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  navigateBack(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  minChecksValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let sum = 0;
      (<FormArray>control).controls.forEach(ctrl => {
        if(ctrl.value) sum += 1;
      });
      return sum ? null : {'MinimumSelection': "Please select atleast one menu"};
    };
  }

  ngOnInit(): void {
    this.fetchMenus();
  }

  menusForm(){
    return (<FormArray>this.createCatForm.controls.menus).controls;
  }

  async fetchMenus() {
    this.isLoading = true;
    await this.restApiService.getData('store/category/menu/' + this.storeService.activeStore, (resp) => {
      if (resp.success && resp.data) {
        resp.data.forEach(menu => {
          this.menuIdMap.push({ id: menu.menu_id, name: menu.menu_name });
          (<FormArray>this.createCatForm.controls.menus).push(new FormControl(false));
        });
      }
      this.isLoading = false;
    })
  }

  saveData(){
    if(this.createCatForm.invalid){
      this.createCatForm.markAllAsTouched();
      return;
    }

    var data: any = {};
    data.category_name = this.createCatForm.value.categoryName;
    
    let checkValues : Array<boolean> = this.createCatForm.controls.menus.value;
    let selectedMenus : Array<{"menu_id": number}>= [];
    for (let i = 0; i < checkValues.length; i++) {
      //if any checkbox is true
      if(checkValues[i]){
        //pull id from menu-to-id map
        selectedMenus.push({"menu_id": this.menuIdMap[i].id})
      } 
    }
    data.menu = selectedMenus;
    
    this.saveBtnLoading = true;
    this.restApiService.postAPI(`store/category/add/${this.storeService.activeStore}`, data, (resp)=>{
      if(resp.success){
        console.log(resp);
        this.saveBtnLoading = false;
        this.alertService.showNotification("Category was successfully created");
      }
    })
  }

  
  reduceFunction(total, val, i){
    console.log("reduce called");
    if(val) {
      total.push({"menu_id": this.menuIdMap[i]}) 
    }
    return total;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  pagebackPopup(back) {
    this.modalService.open(back, { centered: true });
  }

  debug(){
    console.log(this.createCatForm.value);
  }

}
