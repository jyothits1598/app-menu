import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuItemsComponent } from './restaurant-menu-items.component';

describe('RestaurantMenuItemsComponent', () => {
  let component: RestaurantMenuItemsComponent;
  let fixture: ComponentFixture<RestaurantMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
