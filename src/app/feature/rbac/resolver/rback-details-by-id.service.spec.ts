import { TestBed } from '@angular/core/testing';

import { RbackDetailsByIdService } from './rback-details-by-id.service';

describe('RbackDetailsByIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RbackDetailsByIdService = TestBed.get(RbackDetailsByIdService);
    expect(service).toBeTruthy();
  });
});
