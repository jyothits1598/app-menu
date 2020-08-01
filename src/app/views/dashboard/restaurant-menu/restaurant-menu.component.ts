import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Observable, Subject, } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Store } from 'src/app/_models/store';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  isActive: boolean;
  constructor(private route: ActivatedRoute
    , private router: Router
    , private storeService: StoreService
    , private restApiService: RestApiService) {
  }

  ngOnInit(): void {
    this.isActive = this.storeService.activeStore$.value.isActive;
    console.log(this.isActive);
  }

  get storeSer(){
    return this.storeService;
  }
  
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
