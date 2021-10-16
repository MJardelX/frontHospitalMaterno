import { TestBed } from '@angular/core/testing';

import { SaludAuthGuard } from './salud-auth.guard';

describe('SaludAuthGuard', () => {
  let guard: SaludAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaludAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
