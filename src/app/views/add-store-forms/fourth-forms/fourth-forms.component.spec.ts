import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthFormsComponent } from './fourth-forms.component';

describe('FourthFormsComponent', () => {
  let component: FourthFormsComponent;
  let fixture: ComponentFixture<FourthFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourthFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
