import { TestBed } from '@angular/core/testing';

import { ApplicationLogService } from './application-log.service';

describe('ApplicationLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationLogService = TestBed.get(ApplicationLogService);
    expect(service).toBeTruthy();
  });
});
