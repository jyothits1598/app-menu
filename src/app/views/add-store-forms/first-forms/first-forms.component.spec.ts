import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFormsComponent } from './first-forms.component';

describe('FirstFormsComponent', () => {
  let component: FirstFormsComponent;
  let fixture: ComponentFixture<FirstFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
