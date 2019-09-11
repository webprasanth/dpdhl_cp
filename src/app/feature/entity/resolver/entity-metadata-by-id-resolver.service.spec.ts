import { TestBed } from '@angular/core/testing';

import { EntityMetadataByIdResolverService } from './entity-metadata-by-id-resolver.service';

describe('EntityMetadataByIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityMetadataByIdResolverService = TestBed.get(EntityMetadataByIdResolverService);
    expect(service).toBeTruthy();
  });
});
