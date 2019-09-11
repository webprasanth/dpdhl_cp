import { TestBed } from '@angular/core/testing';

import { BusinessUnitResolverService } from './business-unit-resolver.service';

describe('BusinessUnitResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessUnitResolverService = TestBed.get(BusinessUnitResolverService);
    expect(service).toBeTruthy();
  });
});
