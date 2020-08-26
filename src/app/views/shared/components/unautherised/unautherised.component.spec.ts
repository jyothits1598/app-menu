import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnautherisedComponent } from './unautherised.component';

describe('UnautherisedComponent', () => {
  let component: UnautherisedComponent;
  let fixture: ComponentFixture<UnautherisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnautherisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnautherisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
