import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
import { AdminStoreDataService } from '../_services/admin-store-data.service';
import { FileExtentionValidator } from 'src/app/_modules/fileupload/file-validators';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnDestroy, AfterViewInit {
  @ViewChild('sideBarLinks', {read: TemplateRef}) sideLinks: TemplateRef<any>;  
  constructor(private sideNavBarServ: SideNavbarService,
    private adminStoreData: AdminStoreDataService,
    public alertService: AlertService
  ) { }

  uploadApi = (file) => this.adminStoreData.importCSV(file);

  validFileFormats = ['.zip'];
  csvFileValidators = [FileExtentionValidator(this.validFileFormats)];
  
  ngOnDestroy(): void {
    this.sideNavBarServ.RemoveTemplate('AdminDashboard');
  }
  ngAfterViewInit(): void {
    this.sideNavBarServ.AddTemplate(this.sideLinks, null, 'AdminDashboard')
  }
}
