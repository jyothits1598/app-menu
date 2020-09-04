import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Observable, Subject, } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SideNavbarService } from 'src/app/services/side-navbar.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements AfterViewInit, OnInit, OnDestroy {
  notifier = new Subject();
  isActive: boolean = false;
  storeName: string;
  
  constructor(private route: ActivatedRoute
    , private router: Router
    , private storeService: StoreService
    , private restApiService: RestApiService
    , private sideNavServ: SideNavbarService) {
  }
  ngAfterViewInit(): void {
    this.storeService.activeStore$.subscribe((store)=>{
      if(store.name){
        this.storeName = store.name.substring(0, 36) + (store.name.length > 36 ? '. . .' : '');
      }
    })
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
  }
 
  hide() {
  this.isActive = !this.isActive;
  }
}
