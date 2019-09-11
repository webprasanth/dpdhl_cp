import { TestBed } from '@angular/core/testing';

import { ListDetailByIdResoverService } from './list-detail-by-id-resover.service';

describe('ListDetailByIdResoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListDetailByIdResoverService = TestBed.get(ListDetailByIdResoverService);
    expect(service).toBeTruthy();
  });
});
