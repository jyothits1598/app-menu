import { Component, OnInit, TemplateRef, OnDestroy, ViewContainerRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormControlDirective } from '@angular/forms';
import { StoreMenuItem } from 'src/app/_models/store-menu-items';
import { RestApiService } from 'src/app/services/rest-api.service';
import { map, finalize, filter, debounce, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/services/store.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription, Observable, fromEvent, interval, of, merge } from 'rxjs';
import { MinNumberValidator } from 'src/app/_helpers/validators';
import { StoreMenuDataService } from '../../_services/store-menu-data.service';
import { ModifierOptionsComponent } from './modifier-options/modifier-options.component';
import { ModalService } from 'src/app/views/shared/services/modal.service';

@Component({
  selector: 'app-store-menu-modifier-group-create',
  templateUrl: './store-menu-modifier-group-create.component.html',
  styleUrls: ['./store-menu-modifier-group-create.component.scss'],
})
export class StoreMenuModifierGroupCreateComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(public restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private storeMenuData: StoreMenuDataService,
    private modalService: ModalService
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

      this.modifierForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', Validators.required),
        minimum: new FormControl('', Validators.required),
        maximum: new FormControl('', Validators.required),
        free: new FormControl('', Validators.required),
        options: new FormControl(this.modifierId ? null : [{ name: null, price: null }]),
      })
    })
  }

  @ViewChild('options', { read: ModifierOptionsComponent }) optionsRef: ModifierOptionsComponent;
  ngAfterViewInit(): void {
    setTimeout(() => {
      // if (!this.modifierId) this.optionsRef.addOption();
    }, 500);
  }

  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // ----------------------- search functionalify end ----------------------------

  routerSubs: Subscription;
  modifierId: number;
  storeId: number;
  submitting: boolean = false;

  editedItemIndex: number;

  modifierForm: FormGroup;

  ngOnInit(): void {
    if (this.modifierId) this.getInitialData();
    this.storeId = this.storeService.activeStore$.value.id;
  }

  getInitialData() {
    this.alertService.showLoader();
    this.storeMenuData.modiferDetail(this.modifierId).pipe(
      finalize(() => this.alertService.hideLoader())
    ).subscribe(modifier => {
      this.modifierForm.patchValue(modifier)
    });
  }

  saveModifer(formData: any) {

    if (this.modifierForm.invalid) {
      this.modifierForm.markAllAsTouched();
      return;
    }
    this.submitting = true;

    this.storeMenuData.saveModifier(this.modifierForm.value).pipe(
      finalize(() => this.submitting = false)
    ).subscribe(resp => this.router.navigate(['../'], { relativeTo: this.route }));

  }

  deleteModifier() {
    this.modalService.getConfirmation({ heading: `Deleting modifier "${this.modifierForm.controls.name.value}"`, dialog: 'Are you sure?', confirmBtn: 'Delete', declineBtn: 'Cancel' }).pipe(
      switchMap(() => this.storeMenuData.deleteModifier(this.modifierId))
    ).subscribe((resp: any) => { if (resp && resp.success) this.router.navigate(['../'], { relativeTo: this.route }) });
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

}
