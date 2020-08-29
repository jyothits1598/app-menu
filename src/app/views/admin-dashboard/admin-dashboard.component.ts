import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { SideNavbarService } from 'src/app/services/side-navbar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnDestroy, AfterViewInit {
  @ViewChild('sideBarLinks', {read: TemplateRef}) sideLinks: TemplateRef<any>;  
  constructor(private sideNavBarServ: SideNavbarService
  ) { }

  ngOnDestroy(): void {
    this.sideNavBarServ.RemoveTemplate('AdminDashboard');
  }
  ngAfterViewInit(): void {
    this.sideNavBarServ.AddTemplate(this.sideLinks, null, 'AdminDashboard')
  }
}
