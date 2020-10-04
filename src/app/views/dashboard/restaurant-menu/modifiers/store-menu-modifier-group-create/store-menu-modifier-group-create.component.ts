import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { StoreMenuModifierDataService } from '../../_services/store-menu-modifier-data.service';
import { ModifierOptionsComponent } from './modifier-options/modifier-options.component';
import { ModalService } from 'src/app/views/shared/services/modal.service';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { ArrayToConsolidatedString } from 'src/app/_helpers/string-helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-menu-modifier-group-create',
  templateUrl: './store-menu-modifier-group-create.component.html',
  styleUrls: ['./store-menu-modifier-group-create.component.scss'],
})
export class StoreMenuModifierGroupCreateComponent implements OnInit, OnDestroy {

  constructor(public restApiService: RestApiService,
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private storeMenuData: StoreMenuModifierDataService,
    private modalService: ModalService,
    private alertService: AlertService
  ) {
    this.routerSubs = this.route.params.subscribe(params => {
      console.log('this router sub', params['id']);
      if (params['id'] !== undefined) {
        //update existing category
        this.modifierId = +params['id'];
        // if category is not a number
        if (!this.modifierId) {
          this.router.navigate(['./not-found'], { relativeTo: this.route });
        }
      };
      // this.modifierForm = this.createNewForm();
    })
  }

  @Input() set id(modId: number) {
    this.modifierId = modId;
    this.useOutputs = true;
  }

  @Output() exit = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();
  useOutputs: boolean = false;

  numbers = [...Array(100).keys()]
  // ----------------------- search functionalify end ----------------------------

  routerSubs: Subscription;
  modifierId: number;
  storeId: number;
  submitting: boolean = false;
  loaded: boolean = false;

  formSubmitted = false;
  modifierForm: FormGroup;

  minValueChangesSubs: Subscription;

  shouldPreventNavigation() {
    if (!this.modifierForm.dirty) return false;
    else {
      if (this.formSubmitted === true) return false;
      else return true;
    }
  }

  ngOnInit(): void {
    this.modifierForm = this.createNewForm();
    if (this.modifierId) this.getInitialData();
    else this.loaded = true;
    this.storeId = this.storeService.activeStore$.value.id;

    this.minValueChangesSubs = this.modifierForm.controls.minimum.valueChanges.subscribe(
      (val) => {
        if (val) this.modifierForm.controls.maximum.setValidators([Validators.required, Validators.min(val)])
        else this.modifierForm.controls.maximum.setValidators([Validators.required]);
        this.modifierForm.controls.maximum.updateValueAndValidity({ onlySelf: true })
      }

    );
  }

  getInitialData() {
    this.loaded = false;
    this.storeMenuData.modiferDetail(this.modifierId).pipe(
      finalize(() => this.loaded = true)
    ).subscribe(modifier => {
      this.modifierForm.patchValue(modifier)
    });
  }

  navigateBack() {
    if (this.useOutputs) this.exit.emit(true);
    else {
      setTimeout(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      }, 0);
    }
  }

  createNewForm(data: StoreMenuModifier = null): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      minimum: new FormControl('', Validators.required),
      maximum: new FormControl('', Validators.required),
      free: new FormControl('', Validators.required),
      options: new FormControl(this.modifierId ? null : [{ name: null, price: null }]),
      items: new FormControl(null)
    });
  }

  saveModifer(formData: any) {
    if (this.modifierForm.invalid) {
      this.modifierForm.markAllAsTouched();
      this.modifierForm.controls.options.markAsTouched();
      return;
    }
    this.submitting = true;

    this.storeMenuData.saveModifier(this.modifierForm.value).pipe(
      finalize(() => this.submitting = false)
    ).subscribe(resp => {
      if(formData){
        console.log(formData);
      }
      this.formSubmitted = true;
      if (this.useOutputs) this.exit.emit(true);
      else {
        this.alertService.showNotification(`Modifier ${this.modifierId ? "Updated" : "Created"}`,'success') 
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route })
        }, 0);
      }
    });
  }

  duplicateModifier() {
    this.modalService.getConfirmation({ heading: 'Modifier duplication', dialog: "Are you sure?", confirmBtn: 'Continue', declineBtn: 'Cancel' }).pipe(
      tap(() => this.alertService.showLoader()),
      switchMap(() => this.storeMenuData.duplicateModifier(this.modifierId))
    ).pipe(finalize(() => this.alertService.hideLoader())).subscribe(() => { this.alertService.showNotification('A duplicate of this modifier has been created') })
  }

  categoriesToString(items) {
    return ArrayToConsolidatedString(items, 2, (item) => item.name)
  }

  deleteModifier() {
    this.modalService.getConfirmation({ heading: `Deleting modifier "${this.modifierForm.controls.name.value}"`, dialog: 'Are you sure?', confirmBtn: 'Delete', declineBtn: 'Cancel' }).pipe(
      switchMap(() => this.storeMenuData.deleteModifier(this.modifierId))
    ).subscribe((resp: any) => {
      if (resp && resp.success) {
        this.alertService.showNotification(`Modifier deleted`,'success'); 
        if (this.useOutputs)  this.delete.emit(true);
        else this.router.navigate(['../'], { relativeTo: this.route })
      }
    });
  }

  dismiss() {
    if (this.useOutputs) this.exit.emit(true);
    else this.router.navigate(['../'], { relativeTo: this.route });
  }


  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
    this.minValueChangesSubs.unsubscribe();
  }



}
