import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SideNavbarService } from 'src/app/services/side-navbar.service';
import { StoreService } from 'src/app/services/store.service';
import { Observable } from 'rxjs';
import { Store } from 'src/app/_models/store';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements AfterViewInit, OnDestroy {
  id: number;
  
  constructor(private sideNavServ: SideNavbarService,
    private storeService: StoreService) { }
    displayBanner: boolean = true;
    get activeStore(): Observable<Store> {
      return this.storeService.activeStore$;
    }

  @ViewChild('sideBarLinks', { read: TemplateRef }) sideBarLinks: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.sideNavServ.AddTemplate(this.sideBarLinks, this.storeService.activeStore$.value, 'RestMenu');
  }
  ngOnDestroy(): void {
    this.sideNavServ.RemoveTemplate('RestMenu');
  }

  ngOnInit(): void {
  }

}
