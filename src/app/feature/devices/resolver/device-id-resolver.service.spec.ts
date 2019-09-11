import { TestBed } from '@angular/core/testing';

import { DeviceIdResolverService } from './device-id-resolver.service';

describe('DeviceIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceIdResolverService = TestBed.get(DeviceIdResolverService);
    expect(service).toBeTruthy();
  });
});
