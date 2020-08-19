import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuOverviewCategoryListComponent } from './store-menu-overview-category-list.component';

describe('StoreMenuOverviewCategoryListComponent', () => {
  let component: StoreMenuOverviewCategoryListComponent;
  let fixture: ComponentFixture<StoreMenuOverviewCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuOverviewCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuOverviewCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
