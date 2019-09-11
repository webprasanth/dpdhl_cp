import { TestBed } from '@angular/core/testing';

import { OnboardEditResolverService } from './onboard-edit-resolver.service';

describe('OnboardEditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardEditResolverService = TestBed.get(OnboardEditResolverService);
    expect(service).toBeTruthy();
  });
});
