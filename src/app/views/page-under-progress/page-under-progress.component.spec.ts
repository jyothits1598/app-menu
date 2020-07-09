import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnderProgressComponent } from './page-under-progress.component';

describe('PageUnderProgressComponent', () => {
  let component: PageUnderProgressComponent;
  let fixture: ComponentFixture<PageUnderProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageUnderProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUnderProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
