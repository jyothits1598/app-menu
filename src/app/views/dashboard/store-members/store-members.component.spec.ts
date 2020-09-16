import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMembersComponent } from './store-members.component';

describe('StoreMembersComponent', () => {
  let component: StoreMembersComponent;
  let fixture: ComponentFixture<StoreMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
