import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOptionsComponent } from './modifier-options.component';

describe('ModifierOptionsComponent', () => {
  let component: ModifierOptionsComponent;
  let fixture: ComponentFixture<ModifierOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
