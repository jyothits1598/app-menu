import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuModifierGroupsComponent } from './store-menu-modifier-groups.component';

describe('StoreMenuModifierGroupsComponent', () => {
  let component: StoreMenuModifierGroupsComponent;
  let fixture: ComponentFixture<StoreMenuModifierGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuModifierGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuModifierGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
