import { TestBed } from '@angular/core/testing';

import { WhishlistapiService } from './whishlistapi.service';

describe('WhishlistapiService', () => {
  let service: WhishlistapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhishlistapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
