import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreApprovedListComponent } from './store-approved-list.component';

describe('StoreApprovedListComponent', () => {
  let component: StoreApprovedListComponent;
  let fixture: ComponentFixture<StoreApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreApprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
