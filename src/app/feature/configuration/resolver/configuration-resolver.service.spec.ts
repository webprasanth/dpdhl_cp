import { TestBed } from '@angular/core/testing';

import { ConfigurationResolverService } from './configuration-resolver.service';

describe('ConfigurationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationResolverService = TestBed.get(ConfigurationResolverService);
    expect(service).toBeTruthy();
  });
});
