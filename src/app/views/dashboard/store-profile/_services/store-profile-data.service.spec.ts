import { TestBed } from '@angular/core/testing';

import { StoreProfileDataService } from './store-profile-data.service';

describe('StoreProfileDataService', () => {
  let service: StoreProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
