import { TestBed } from '@angular/core/testing';

import { BackfetchService } from './backfetch.service';

describe('BackfetchService', () => {
  let service: BackfetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackfetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
