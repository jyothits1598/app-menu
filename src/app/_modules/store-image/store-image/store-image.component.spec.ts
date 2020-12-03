import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreImageComponent } from './store-image.component';

describe('StoreImageComponent', () => {
  let component: StoreImageComponent;
  let fixture: ComponentFixture<StoreImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
