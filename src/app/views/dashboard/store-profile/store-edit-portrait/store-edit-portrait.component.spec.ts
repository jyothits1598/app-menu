import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditPortraitComponent } from './store-edit-portrait.component';

describe('StoreEditPortraitComponent', () => {
  let component: StoreEditPortraitComponent;
  let fixture: ComponentFixture<StoreEditPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
