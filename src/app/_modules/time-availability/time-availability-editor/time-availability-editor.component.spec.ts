import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAvailabilityEditorComponent } from './time-availability-editor.component';

describe('TimeAvailabilityEditorComponent', () => {
  let component: TimeAvailabilityEditorComponent;
  let fixture: ComponentFixture<TimeAvailabilityEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAvailabilityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAvailabilityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
