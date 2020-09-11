import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOwnershipDetailsComponent } from './store-ownership-details.component';

describe('StoreOwnershipDetailsComponent', () => {
  let component: StoreOwnershipDetailsComponent;
  let fixture: ComponentFixture<StoreOwnershipDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOwnershipDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOwnershipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
