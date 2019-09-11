import { TestBed } from '@angular/core/testing';

import { ApplicationListIdResolverService } from './application-list-id-resolver.service';

describe('ApplicationListIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationListIdResolverService = TestBed.get(ApplicationListIdResolverService);
    expect(service).toBeTruthy();
  });
});
