import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFormsComponent } from './second-forms.component';

describe('SecondFormsComponent', () => {
  let component: SecondFormsComponent;
  let fixture: ComponentFixture<SecondFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
