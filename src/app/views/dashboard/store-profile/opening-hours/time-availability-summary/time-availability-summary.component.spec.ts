import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAvailabilitySummaryComponent } from './time-availability-summary.component';

describe('TimeAvailabilitySummaryComponent', () => {
  let component: TimeAvailabilitySummaryComponent;
  let fixture: ComponentFixture<TimeAvailabilitySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAvailabilitySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAvailabilitySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
