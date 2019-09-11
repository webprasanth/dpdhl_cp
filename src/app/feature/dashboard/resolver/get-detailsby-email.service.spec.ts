import { TestBed } from '@angular/core/testing';

import { GetDetailsbyEmailService } from './get-detailsby-email.service';

describe('GetDetailsbyEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDetailsbyEmailService = TestBed.get(GetDetailsbyEmailService);
    expect(service).toBeTruthy();
  });
});
