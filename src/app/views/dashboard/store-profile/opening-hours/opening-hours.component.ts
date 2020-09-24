import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreMenuTime } from 'src/app/_models/store-menu';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { StoreProfileDataService } from '../_services/store-profile-data.service';
import { StoreBasicDetails } from '../_model/store-basic-details';
import { TimeAvailability } from 'src/app/_modules/time-availability/_model/time-availability';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { TimeAvailabilityEditorComponent } from 'src/app/_modules/time-availability/time-availability-editor/time-availability-editor.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit {
  storeId: number;
  storeBasicDetail: StoreBasicDetails;
  availabilityCache: Array<TimeAvailability>;
  editMode: boolean = false;

  @ViewChild('editior', { read: TimeAvailabilityEditorComponent }) editior: TimeAvailabilityEditorComponent;
  constructor(
    private _modalService: NgbModal,
    private storeService: StoreService,
    private storeProfData: StoreProfileDataService,
    private alertservice: AlertService
  ) { }

  ngOnInit(): void {
    this.storeId = this.storeService.activeStore$.value.id;
    this.storeProfData.GetStoreBasicData(this.storeId).subscribe(detail => {
      this.storeBasicDetail = detail;
    });
  }

  initiateSave() {
    if (this.storeBasicDetail.openingHours.length == 0) return;
    this.storeProfData.SaveStoreBasicData(this.storeBasicDetail).pipe(
      tap(() => {
        this.storeBasicDetail = null;
        this.toggleEdit();
        this.alertservice.showNotification('Opening hours updated successfully.', 'success')
      }),
      switchMap(
        () => this.storeProfData.GetStoreBasicData(this.storeId)
      )).subscribe(
        storeDet => this.storeBasicDetail = storeDet
      )
  }

  toggleEdit() {
    if (!this.editMode) {
      //make a cached copy of availability, restored upon cancel
      this.availabilityCache = [...this.storeBasicDetail.openingHours];
    }
    this.editMode = !this.editMode;
  }

  get modalService(): NgbModal {
    return this._modalService;
  }
}