import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-restaurant-menu-menus',
  templateUrl: './restaurant-menu-menus.component.html',
  styleUrls: ['./restaurant-menu-menus.component.scss']
})
export class RestaurantMenuMenusComponent implements OnInit , OnDestroy{
  showMenuAddComponent : boolean = false;
  paramMap$ : Observable<ParamMap> = null;

  menus = [];
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.paramMap$ = this.activatedRoute.paramMap;
    this.paramMap$.subscribe((param)=>{this.showMenuAddComponent = param.get('editor') == 'true' ? true : false})
  }

}
