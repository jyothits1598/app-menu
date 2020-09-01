import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements AfterViewInit, OnDestroy {

  constructor(private sideNavServ: SideNavbarService,
    private storeService: StoreService) { }

  @ViewChild('sideBarLinks', { read: TemplateRef }) sideBarLinks: TemplateRef<any>;

  ngAfterViewInit(): void {
    console.log('adding side nav templates');
    this.sideNavServ.AddTemplate(this.sideBarLinks, this.storeService.activeStore$.value, 'RestMenu');
  }
  ngOnDestroy(): void {
    this.sideNavServ.RemoveTemplate('RestMenu');
  }

  ngOnInit(): void {
    console.log('adding side nav templates');

  }

}
