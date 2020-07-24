import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuCategoriesContainerComponent } from './store-menu-categories-container.component';

describe('StoreMenuCategoriesContainerComponent', () => {
  let component: StoreMenuCategoriesContainerComponent;
  let fixture: ComponentFixture<StoreMenuCategoriesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuCategoriesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuCategoriesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
