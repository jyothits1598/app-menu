import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailContainerComponent } from './store-detail-container.component';

describe('StoreDetailContainerComponent', () => {
  let component: StoreDetailContainerComponent;
  let fixture: ComponentFixture<StoreDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
