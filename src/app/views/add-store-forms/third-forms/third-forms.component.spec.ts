import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdFormsComponent } from './third-forms.component';

describe('ThirdFormsComponent', () => {
  let component: ThirdFormsComponent;
  let fixture: ComponentFixture<ThirdFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
