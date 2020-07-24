import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuItemsCreateComponent } from './store-menu-items-create.component';

describe('StoreMenuItemsCreateComponent', () => {
  let component: StoreMenuItemsCreateComponent;
  let fixture: ComponentFixture<StoreMenuItemsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuItemsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuItemsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
