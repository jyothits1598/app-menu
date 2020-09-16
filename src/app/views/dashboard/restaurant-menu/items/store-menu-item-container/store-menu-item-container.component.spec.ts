import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuItemContainerComponent } from './store-menu-item-container.component';

describe('StoreMenuItemContainerComponent', () => {
  let component: StoreMenuItemContainerComponent;
  let fixture: ComponentFixture<StoreMenuItemContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuItemContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
