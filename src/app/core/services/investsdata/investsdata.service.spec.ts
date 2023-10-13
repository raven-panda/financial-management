import { TestBed } from '@angular/core/testing';

import { InvestsdataService } from './investsdata.service';

describe('InvestsdataService', () => {
  let service: InvestsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
