import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuOverviewComponent } from './restaurant-menu-overview.component';

describe('RestaurantMenuOverviewComponent', () => {
  let component: RestaurantMenuOverviewComponent;
  let fixture: ComponentFixture<RestaurantMenuOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMenuOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
