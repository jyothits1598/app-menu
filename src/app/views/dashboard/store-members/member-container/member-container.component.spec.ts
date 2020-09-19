import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContainerComponent } from './member-container.component';

describe('MemberContainerComponent', () => {
  let component: MemberContainerComponent;
  let fixture: ComponentFixture<MemberContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
