import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTokenExpiredComponent } from './email-token-expired.component';

describe('EmailTokenExpiredComponent', () => {
  let component: EmailTokenExpiredComponent;
  let fixture: ComponentFixture<EmailTokenExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTokenExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTokenExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
