import { TestBed } from '@angular/core/testing';

import { ApplicationLogResolverService } from './application-log-resolver.service';

describe('ApplicationLogResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationLogResolverService = TestBed.get(ApplicationLogResolverService);
    expect(service).toBeTruthy();
  });
});
