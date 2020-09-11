import { TestBed } from '@angular/core/testing';

import { StoreMenuDataService } from './store-menu-data.service';

describe('StoreMenuDataService', () => {
  let service: StoreMenuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMenuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
