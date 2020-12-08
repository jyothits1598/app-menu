import { TestBed } from '@angular/core/testing';

import { LibraryLoaderService } from './library-loader.service';

describe('LibraryLoaderService', () => {
  let service: LibraryLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
