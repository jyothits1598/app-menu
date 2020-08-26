import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Observable, Subject, } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Store } from 'src/app/_models/store';
import { SideNavbarService } from 'src/app/services/side-navbar.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements AfterViewInit, OnInit, OnDestroy {
  notifier = new Subject();
  isActive: boolean = false;

  @ViewChild('sideBarLinks', { read: TemplateRef }) sideBarLinks: TemplateRef<any>;
  
  constructor(private route: ActivatedRoute
    , private router: Router
    , private storeService: StoreService
    , private restApiService: RestApiService
    , private sideNavServ: SideNavbarService) {
  }
  ngAfterViewInit(): void {
    this.storeService.activeStore$.subscribe((store)=>{
      console.log('active store resolved', store);
    })
    this.sideNavServ.AddTemplate(this.sideBarLinks, this.storeService.activeStore$.value, 'RestMenu');
  }

  ngOnInit(): void {
    this.isActive = this.storeService.activeStore$.value.isActive;
  }

  get storeSer(){
    return this.storeService;
  }
  
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.sideNavServ.RemoveTemplate('RestMenu');
  }
 
  hide() {
  this.isActive = !this.isActive;
  }
}
