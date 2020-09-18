import { TestBed } from '@angular/core/testing';

import { StoreMenuItemDataService } from './store-menu-item-data.service';

describe('StoreMenuItemDataService', () => {
  let service: StoreMenuItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMenuItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
