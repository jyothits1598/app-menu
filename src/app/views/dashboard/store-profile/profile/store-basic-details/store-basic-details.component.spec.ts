import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBasicDetailsComponent } from './store-basic-details.component';

describe('StoreBasicDetailsComponent', () => {
  let component: StoreBasicDetailsComponent;
  let fixture: ComponentFixture<StoreBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
