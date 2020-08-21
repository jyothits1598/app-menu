import { TestBed } from '@angular/core/testing';

import { StoreMenuService } from './store-menu.service';

describe('StoreMenuService', () => {
  let service: StoreMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
