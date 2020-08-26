import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { StoreService } from 'src/app/services/store.service';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
import { SidebarTemplate } from 'src/app/_models/sidebar-template';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent{
  storeNames = new Array();
  public show: boolean = false;
  public buttonName: any = 'Show';

  dashboard_url: string = "/dashboard/partner";
  menu_url: string = "/partner/stores";
  dashboard_status: boolean = false;
  menu_status: boolean = false;

  constructor(
    private authenticateService: AuthenticationService,
    private sideNavBarService: SideNavbarService
  ) { }

  get sideBarTemplates(): Array<SidebarTemplate> {
    return this.sideNavBarService.templates;
  }

  ngOnInit(): void {

  }

  /*
   * Logout function 
   */
  logout() {
    this.authenticateService.logout();
  }
}
