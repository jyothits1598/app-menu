import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Observable, Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  
  constructor(private route: ActivatedRoute
    , private storeService: StoreService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      this.storeService.activeStore = +params['id'];
    })
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
