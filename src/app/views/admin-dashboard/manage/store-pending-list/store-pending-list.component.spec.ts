import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePendingListComponent } from './store-pending-list.component';

describe('StorePendingListComponent', () => {
  let component: StorePendingListComponent;
  let fixture: ComponentFixture<StorePendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
