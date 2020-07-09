import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthFormsComponent } from './fifth-forms.component';

describe('FifthFormsComponent', () => {
  let component: FifthFormsComponent;
  let fixture: ComponentFixture<FifthFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifthFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
