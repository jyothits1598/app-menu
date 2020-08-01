import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuModifierGroupsComponent } from './restaurant-menu-modifier-groups.component';

describe('RestaurantMenuModifierGroupsComponent', () => {
  let component: RestaurantMenuModifierGroupsComponent;
  let fixture: ComponentFixture<RestaurantMenuModifierGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantMenuModifierGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantMenuModifierGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
