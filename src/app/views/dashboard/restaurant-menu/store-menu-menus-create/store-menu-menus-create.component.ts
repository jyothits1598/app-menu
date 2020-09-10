import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { StoreMenuTime } from 'src/app/_models/store-menu';
import { FormControl, Validators, FormGroupDirective, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StoreService } from 'src/app/services/store.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeAvailability } from 'src/app/_modules/time-availability/_model/time-availability';
import { TimeAvailabilityEditorComponent } from 'src/app/_modules/time-availability/time-availability-editor/time-availability-editor.component';

@Component({
  selector: 'app-store-menu-menus-create',
  templateUrl: './store-menu-menus-create.component.html',
  styleUrls: ['./store-menu-menus-create.component.scss']
})
export class StoreMenuMenusCreateComponent implements OnInit, OnDestroy {
  @ViewChild('availabilityEditor', {read: TimeAvailabilityEditorComponent, static: true}) availabilityEditor : TimeAvailabilityEditorComponent;
  
  menuId: number = null;
  menuName: FormControl = new FormControl('', Validators.required);

  submitting: boolean = false;

  availability: Array<TimeAvailability> = [];
  availabilityTouched = true;
  notifier = new Subject();

  selectedDays: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restApiService: RestApiService,
    private storeService: StoreService,
    private alertService: AlertService,
    private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      if (params['id']) {
        this.fetchMenu(+params['id']);
      }
    })
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  pagebackPopup(back) {
    this.modalService.open(back, { centered: true, size: 'sm' });
  }
  
  get modalService(): NgbModal {
    return this._modalService;
  }

  fetchMenu(id: number) {
    this.alertService.showLoader();
    this.restApiService.getData(`store/menus/availability/get/${this.storeService.activeStore}/${id}`
      , (response) => {
        this.alertService.hideLoader();
        if (response.success) {
          this.menuName.setValue(response.data[0].menu_details.menu_name);
          this.menuId = response.data[0].menu_details.menu_id;
          this.availability = this.storeService.readAvailability(response.data[0].availability);
          console.log('read availability', this.availability);

        } else {
          this.router.navigate(['notfound'], { relativeTo: this.route });
        }
      }
      , error => this.alertService.hideLoader())
  }

  ngOnDestroy(): void {
    this.notifier.next(false);
  }


  readyToSave(): boolean {
    if (this.menuName.invalid) {
      return false;
    }

    if (this.availability.length == 0) {
      return false;
    }

    return true;
  }

  saveMenu() {
    if (!this.readyToSave()) {
      this.menuName.markAllAsTouched();
      this.alertService.showNotification('Please complete the form below');
      return;
    }

    let data: any = {}
    data.opening_time = [];

    data.menu_name = this.menuName.value;
    if (this.menuId) data.menu_id = this.menuId;


    this.availability.forEach((a) => {
      let menuTime: any = {};
      menuTime.days = a.day;
      menuTime.start_time = a.startTime;
      menuTime.end_time = a.endTime;
      menuTime.marked_as_closed = a.markedAsClose;
      // menuTime.active_flag = 0;
      data.opening_time.push(menuTime);
    })

    this.submitting = true;
    this.restApiService.postAPI(`store/menus/add/${this.storeService.activeStore}`,
      data,
      (resp) => {
        if (resp.success) {
          this.submitting = false;
          // this.alertService.showNotification(`Menu successfully ${this.menuId ? 'updated' : 'created'}`);
          this.router.navigate(['.'], { relativeTo: this.route.parent });
        } else if (!resp.success) { 
          this.submitting = false;
          let error_data = resp['error']['error']['menu_name'][0];
          this.alertService.showNotification(error_data, 'error');
        }
        else this.alertService.showNotification(`There was an error ${this.menuId ? 'updating' : 'creating'} the menu. Please try again.`);
      })
      // (err) => { this.submitting = false; })
  }

  deleteMenu() {
    let data: any = {}
    data.menu_name = this.menuName.value;
    data.menu_id = this.menuId;
    data.active_flag = 1;

    this.restApiService.postAPI(`store/menus/add/${this.storeService.activeStore}`, data, (resp) => {
      if (resp.success) {
        // this.alertService.showNotification('Menu successfully deleted');
        this.router.navigate(['.'], { relativeTo: this.route.parent });
      } else this.alertService.showNotification(`There was an error deleting the menu. Please try again.`);
    })
  }


  debug(){
    console.log(this.availability);
  }

}


export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}