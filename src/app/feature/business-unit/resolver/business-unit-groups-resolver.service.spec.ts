import { TestBed } from '@angular/core/testing';

import { BusinessUnitGroupsResolverService } from './business-unit-groups-resolver.service';

describe('BusinessUnitGroupsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessUnitGroupsResolverService = TestBed.get(BusinessUnitGroupsResolverService);
    expect(service).toBeTruthy();
  });
});
