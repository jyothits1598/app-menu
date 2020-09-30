import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQueryGeneratorComponent } from './search-query-generator.component';

describe('SearchQueryGeneratorComponent', () => {
  let component: SearchQueryGeneratorComponent;
  let fixture: ComponentFixture<SearchQueryGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQueryGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQueryGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
