import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePendingContainerComponent } from './store-pending-container.component';

describe('StorePendingContainerComponent', () => {
  let component: StorePendingContainerComponent;
  let fixture: ComponentFixture<StorePendingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePendingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePendingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
