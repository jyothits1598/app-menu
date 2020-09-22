import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStoreInvitationComponent } from './member-store-invitation.component';

describe('MemberStoreInvitationComponent', () => {
  let component: MemberStoreInvitationComponent;
  let fixture: ComponentFixture<MemberStoreInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberStoreInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStoreInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
