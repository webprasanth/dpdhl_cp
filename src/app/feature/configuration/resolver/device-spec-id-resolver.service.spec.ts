import { TestBed } from '@angular/core/testing';

import { DeviceSpecIdResolverService } from './device-spec-id-resolver.service';

describe('DeviceSpecIdResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceSpecIdResolverService = TestBed.get(DeviceSpecIdResolverService);
    expect(service).toBeTruthy();
  });
});
