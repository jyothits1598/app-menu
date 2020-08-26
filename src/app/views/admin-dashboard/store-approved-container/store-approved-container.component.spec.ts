import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreApprovedContainerComponent } from './store-approved-container.component';

describe('StoreApprovedContainerComponent', () => {
  let component: StoreApprovedContainerComponent;
  let fixture: ComponentFixture<StoreApprovedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreApprovedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreApprovedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
