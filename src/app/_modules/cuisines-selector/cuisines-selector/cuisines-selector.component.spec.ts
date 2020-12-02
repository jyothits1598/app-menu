import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisinesSelectorComponent } from './cuisines-selector.component';

describe('CuisinesSelectorComponent', () => {
  let component: CuisinesSelectorComponent;
  let fixture: ComponentFixture<CuisinesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisinesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisinesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
