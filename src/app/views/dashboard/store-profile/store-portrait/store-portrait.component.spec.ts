import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePortraitComponent } from './store-portrait.component';

describe('StorePortraitComponent', () => {
  let component: StorePortraitComponent;
  let fixture: ComponentFixture<StorePortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
