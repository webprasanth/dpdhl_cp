import { TestBed } from '@angular/core/testing';

import { BusinessUnitListResolverService } from './business-unit-list-resolver.service';

describe('BusinessUnitListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessUnitListResolverService = TestBed.get(BusinessUnitListResolverService);
    expect(service).toBeTruthy();
  });
});
