import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProfilesContainerComponent } from './store-profiles-container.component';

describe('StoreProfilesContainerComponent', () => {
  let component: StoreProfilesContainerComponent;
  let fixture: ComponentFixture<StoreProfilesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProfilesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProfilesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
