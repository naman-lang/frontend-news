import { TestBed } from '@angular/core/testing';

import { StocksapiService } from './stocksapi.service';

describe('StocksapiService', () => {
  let service: StocksapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
