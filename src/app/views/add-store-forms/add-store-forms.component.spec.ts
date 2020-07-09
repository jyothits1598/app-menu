import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreFormsComponent } from './add-store-forms.component';

describe('AddStoreFormsComponent', () => {
  let component: AddStoreFormsComponent;
  let fixture: ComponentFixture<AddStoreFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoreFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoreFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
