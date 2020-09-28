import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreApprovedDetailsComponent } from './store-approved-details.component';

describe('StoreApprovedDetailsComponent', () => {
  let component: StoreApprovedDetailsComponent;
  let fixture: ComponentFixture<StoreApprovedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreApprovedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreApprovedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
