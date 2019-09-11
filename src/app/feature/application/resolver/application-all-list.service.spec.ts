import { TestBed } from '@angular/core/testing';

import { ApplicationAllListService } from './application-all-list.service';

describe('ApplicationAllListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationAllListService = TestBed.get(ApplicationAllListService);
    expect(service).toBeTruthy();
  });
});
