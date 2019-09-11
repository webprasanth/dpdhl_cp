import { TestBed } from '@angular/core/testing';

import { DeviceGroupListResolverService } from './device-group-list-resolver.service';

describe('DeviceGroupListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceGroupListResolverService = TestBed.get(DeviceGroupListResolverService);
    expect(service).toBeTruthy();
  });
});
