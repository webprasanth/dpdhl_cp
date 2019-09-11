import { TestBed } from '@angular/core/testing';

import { AssociationsResolverService } from './associations-resolver.service';

describe('AssociationsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociationsResolverService = TestBed.get(AssociationsResolverService);
    expect(service).toBeTruthy();
  });
});
