import { TestBed } from '@angular/core/testing';

import { InvestActionService } from './investaction.service';

describe('InvestsdataService', () => {
  let service: InvestActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
