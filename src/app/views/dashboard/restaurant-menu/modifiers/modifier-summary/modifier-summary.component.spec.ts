import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSummaryComponent } from './modifier-summary.component';

describe('ModifierSummaryComponent', () => {
  let component: ModifierSummaryComponent;
  let fixture: ComponentFixture<ModifierSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
