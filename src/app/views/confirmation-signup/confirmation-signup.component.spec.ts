import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSignupComponent } from './confirmation-signup.component';

describe('ConfirmationSignupComponent', () => {
  let component: ConfirmationSignupComponent;
  let fixture: ComponentFixture<ConfirmationSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
