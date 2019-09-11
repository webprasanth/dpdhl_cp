import { TestBed } from '@angular/core/testing';

import { BusinessUnitIdResolverService } from './business-unit-id-resolver.service';

describe('BusinessUnitIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessUnitIdResolverService = TestBed.get(BusinessUnitIdResolverService);
    expect(service).toBeTruthy();
  });
});
