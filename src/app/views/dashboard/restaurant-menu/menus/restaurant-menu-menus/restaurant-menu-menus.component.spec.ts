import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuMenusComponent } from './restaurant-menu-menus.component';

describe('RestaurantMenuMenusComponent', () => {
  let component: RestaurantMenuMenusComponent;
  let fixture: ComponentFixture<RestaurantMenuMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMenuMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
