import { TestBed } from '@angular/core/testing';

import { ResourceGroupResolverService } from './resource-group-resolver.service';

describe('ResourceGroupResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceGroupResolverService = TestBed.get(ResourceGroupResolverService);
    expect(service).toBeTruthy();
  });
});
