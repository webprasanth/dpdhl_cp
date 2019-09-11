import { TestBed } from '@angular/core/testing';

import { ApplicationResolverService } from './application-resolver.service';

describe('ApplicationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationResolverService = TestBed.get(ApplicationResolverService);
    expect(service).toBeTruthy();
  });
});
