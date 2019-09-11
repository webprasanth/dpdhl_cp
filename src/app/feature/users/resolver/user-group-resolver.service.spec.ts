import { TestBed } from '@angular/core/testing';

import { UserGroupResolverService } from './user-group-resolver.service';

describe('UserGroupResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGroupResolverService = TestBed.get(UserGroupResolverService);
    expect(service).toBeTruthy();
  });
});
