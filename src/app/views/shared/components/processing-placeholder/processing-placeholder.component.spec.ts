import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingPlaceholderComponent } from './processing-placeholder.component';

describe('ProcessingPlaceholderComponent', () => {
  let component: ProcessingPlaceholderComponent;
  let fixture: ComponentFixture<ProcessingPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
