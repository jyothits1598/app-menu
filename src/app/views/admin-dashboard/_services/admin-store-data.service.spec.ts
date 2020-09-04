import { TestBed } from '@angular/core/testing';

import { AdminStoreDataService } from './admin-store-data.service';

describe('AdminStoreDataService', () => {
  let service: AdminStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
