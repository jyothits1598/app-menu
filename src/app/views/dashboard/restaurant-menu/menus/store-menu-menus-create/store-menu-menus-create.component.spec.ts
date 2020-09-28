import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuMenusCreateComponent } from './store-menu-menus-create.component';

describe('StoreMenuMenusCreateComponent', () => {
  let component: StoreMenuMenusCreateComponent;
  let fixture: ComponentFixture<StoreMenuMenusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuMenusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuMenusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
