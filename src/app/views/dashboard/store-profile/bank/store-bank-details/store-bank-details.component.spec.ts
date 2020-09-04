import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBankDetailsComponent } from './store-bank-details.component';

describe('StoreBankDetailsComponent', () => {
  let component: StoreBankDetailsComponent;
  let fixture: ComponentFixture<StoreBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
