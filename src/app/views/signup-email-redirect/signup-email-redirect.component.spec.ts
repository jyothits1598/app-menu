import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEmailRedirectComponent } from './signup-email-redirect.component';

describe('SignupEmailRedirectComponent', () => {
  let component: SignupEmailRedirectComponent;
  let fixture: ComponentFixture<SignupEmailRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupEmailRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupEmailRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
