import { TestBed } from '@angular/core/testing';

import { PrivilegeResolverService } from './privilege-resolver.service';

describe('PrivilegeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivilegeResolverService = TestBed.get(PrivilegeResolverService);
    expect(service).toBeTruthy();
  });
});
