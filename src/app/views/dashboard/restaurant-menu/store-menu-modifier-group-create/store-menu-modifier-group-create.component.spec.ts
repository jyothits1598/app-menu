import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMenuModifierGroupCreateComponent } from './store-menu-modifier-group-create.component';

describe('StoreMenuModifierGroupCreateComponent', () => {
  let component: StoreMenuModifierGroupCreateComponent;
  let fixture: ComponentFixture<StoreMenuModifierGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMenuModifierGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMenuModifierGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
