import { TestBed } from '@angular/core/testing';

import { StoreMenuModifierDataService } from './store-menu-modifier-data.service';

describe('StoreMenuDataService', () => {
  let service: StoreMenuModifierDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMenuModifierDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
