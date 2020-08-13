import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuOverviewDetailedComponent } from './store-menu-overview-detailed.component';

describe('StoreMenuOverviewDetailedComponent', () => {
  let component: StoreMenuOverviewDetailedComponent;
  let fixture: ComponentFixture<StoreMenuOverviewDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuOverviewDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuOverviewDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
