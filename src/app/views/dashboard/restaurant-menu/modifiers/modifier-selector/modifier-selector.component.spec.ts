import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSelectorComponent } from './modifier-selector.component';

describe('ModifierSelectorComponent', () => {
  let component: ModifierSelectorComponent;
  let fixture: ComponentFixture<ModifierSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
