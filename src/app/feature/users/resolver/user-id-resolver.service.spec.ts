import { TestBed } from '@angular/core/testing';

import { UserIdResolverService } from './user-id-resolver.service';

describe('UserIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIdResolverService = TestBed.get(UserIdResolverService);
    expect(service).toBeTruthy();
  });
});
