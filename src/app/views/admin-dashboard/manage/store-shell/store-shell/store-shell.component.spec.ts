import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreShellComponent } from './store-shell.component';

describe('StoreShellComponent', () => {
  let component: StoreShellComponent;
  let fixture: ComponentFixture<StoreShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
