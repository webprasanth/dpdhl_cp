import { TestBed } from '@angular/core/testing';

import { NotificationResolverService } from './notification-resolver.service';

describe('NotificationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationResolverService = TestBed.get(NotificationResolverService);
    expect(service).toBeTruthy();
  });
});
