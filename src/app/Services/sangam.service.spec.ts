import { TestBed } from '@angular/core/testing';

import { SangamService } from './sangam.service';

describe('SangamService', () => {
  let service: SangamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SangamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
