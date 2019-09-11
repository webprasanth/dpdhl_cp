import { TestBed } from '@angular/core/testing';

import { EntityByIdResolverService } from './entity-by-id-resolver.service';

describe('EntityByIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityByIdResolverService = TestBed.get(EntityByIdResolverService);
    expect(service).toBeTruthy();
  });
});
