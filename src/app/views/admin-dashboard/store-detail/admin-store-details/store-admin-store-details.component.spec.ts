import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePendingDetailsComponent } from './admin-store-details.component';

describe('StorePendingDetailsComponent', () => {
  let component: StorePendingDetailsComponent;
  let fixture: ComponentFixture<StorePendingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePendingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePendingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
