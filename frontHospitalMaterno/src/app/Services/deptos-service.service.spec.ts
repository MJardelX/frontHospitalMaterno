import { TestBed } from '@angular/core/testing';

import { DeptosServiceService } from './deptos-service.service';

describe('DeptosServiceService', () => {
  let service: DeptosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeptosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
