import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuCategoriesCreateComponent } from './store-menu-categories-create.component';

describe('StoreMenuCategoriesCreateComponent', () => {
  let component: StoreMenuCategoriesCreateComponent;
  let fixture: ComponentFixture<StoreMenuCategoriesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuCategoriesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuCategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
