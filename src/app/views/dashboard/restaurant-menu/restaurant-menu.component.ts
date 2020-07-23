import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    , private router: Router
    , private storeService: StoreService) { 

      this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
        if(+params['id']) this.storeService.activeStore = +params['id'];
        else {
          console.log("navigating in main component");
          this.router.navigate(['./notfound'], {relativeTo: this.route});
        }
      })
      
    }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}
